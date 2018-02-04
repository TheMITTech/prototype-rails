# encoding: utf-8

namespace :prefill do
  desc "TODO"

  task nuke135: :environment do
    Issue.where('volume = 135').each do |i|
      i.pieces.each do |p|
        if p.article
          p.article.article_versions.each do |v|
            v.destroy
          end

          p.article.authorships.each do |s|
            s.destroy
          end

          p.article.destroy
        end

        images = (p.images + [p.image]).compact

        images.each do |m|
          m.pictures.each do |p|
            p.destroy
          end
          m.destroy
        end

        p.legacy_comments.each do |c|
          c.destroy
        end

        p.taggings.each do |g|
          g.destroy
        end

        p.destroy
      end

      i.destroy
    end
  end

  task extract_photographers: :environment do
    pattern = /^(.*?)(—|-)\s*The Tech$/i

    Image.find_each do |i|
      att = i.attribution.strip.encode('utf-8')
      match = pattern.match(att)

      next unless i.author.nil?

      if match.nil?
        author = Author.where("lower(name) = ?", att.downcase).first

        if author
          i.author = author
          i.save
        else
          puts "Not matching: [#{i.id}] " + att unless att.downcase =~ /courtesy/
        end
      else
        name = match[1].strip

        author = Author.where("lower(name) = ?", name.downcase).first

        if author.nil?
          puts 'Creating: ' + name
          author = Author.create(name: name)
        end

        i.author = author
        i.save
      end
    end
  end

  task fill_published_at: :environment do
    count = 0
    Piece.find_in_batches(batch_size: 100) do |b|
      count += 100

      b.each do |p|
        if (p.article.nil? && p.image.nil?)
          puts p.id
          next
        end

        if p.article
          p.update_columns(published_at: p.article.original_published_version.created_at)
        else
          p.update_columns(published_at: p.image.updated_at)
        end
      end

      puts "#{count}. "
    end
  end

  task clean_pt: :environment do
    Article.record_timestamps = false
    Piece.record_timestamps = false
    ArticleVersion.record_timestamps = false

    Article.find_each do |a|
      pt = a.piece.primary_tag

      next unless pt

      reg = /^#{pt.upcase}:(.*)$/
      match = reg.match(a.headline.squish)

      if match
        nh = match[1].strip

        puts nh

        a.update(headline: nh)

        v = a.latest_published_version

        contents = v.contents

        contents[:article_attributes][:headline] = nh
        contents[:article_params][:headline] = nh
        v.update(contents: contents)

        a.piece.update(published_headline: nh)
      end
    end

    Article.record_timestamps = true
    Piece.record_timestamps = true
    ArticleVersion.record_timestamps = true
  end

  task square: :environment do
    count = 0
    Picture.find_each do |p|
      count += 1

      if !p.content.exists?(:square)
        p.content.reprocess!(:square)
      end

      if count % 10 == 0
        msg = count.to_s + " square regenerated. "
        File.open('/tmp/square.log', 'a+') { |f| f.puts msg }
        puts msg
      end
    end
  end

  desc "Setup initial issues, homepages, sections, that the site needs to render properly"
  task :setup, [:issues] => [:environment] do |t, args|
    issues = args[:issues] || 5

    Rake::Task['prefill:create_root'].invoke
    Rake::Task['prefill:sections'].invoke
    Rake::Task['prefill:create_initial_issue'].invoke
    # Rake::Task['prefill:import_legacy'].invoke(issues, 0, 0)
    Rake::Task['prefill:create_homepage'].invoke
  end

  task create_root: :environment do
    if User.find_by(email: 'admin@mit.edu')
      puts 'Superuser already exists. '
    else
      user = User.create(email: 'admin@mit.edu', password: 'themittech', password_confirmation: 'themittech', name: 'Administrator')
      user.roles.create(value: 1)
    end
  end

  task sections: :environment do
    Section.destroy_all

    [
      'News',
      'Opinion',
      'Campus Life',
      'Arts',
      'Sports',
      'World and Nation',
      'Features',
      'Science',
      'Fun'
    ].each_with_index do |section, index|
      Section.create(name: section, id: index)
    end
  end

  task create_initial_issue: :environment do
    i = Issue.new("number"=>"1", "volume"=>"1", "published_at"=>"10/04/2016")
    i.save

  end

  task :import_legacy, [:num, :skip, :html] => [:environment] do |t, args|
    require 'legacy_db_parser'
    db_args = YAML.load(File.read(File.join(Rails.root, 'config/database.yml')))['legacy']
    parser = TechParser::LegacyDBParser.new(db_args['host'], db_args['username'], db_args['password'], db_args['database'])
    parser.import!({num: args[:num], skip: args[:skip], legacy_html: args[:html]})
  end

  task create_homepage: :environment do
    pieces = ArticleVersion.where(web_status: 1).map {|v| v.article.piece}.uniq.map {|p| p.id}
    pictures = Picture.all.map {|p| p.id}
    homepage_layout = []

    p1 = pieces.sample
    p2 = pieces.sample
    p3 = pieces.sample
    p4 = pieces.sample
    p5 = pieces.sample

    i1 = pictures.sample
    i2 = pictures.sample
    i3 = pictures.sample

    if pieces.any? && pictures.any?
      # create sample two-row homepage layout
      homepage_layout = [
        {modules: [
          {cols: 1, submodules: [
            {type: 'img_nocaption', picture: pictures.sample},
            {type: 'article', piece: p1, headline: Piece.find(p1).article.headline, lede: Piece.find(p1).article.lede},
            {type: 'links', links: [pieces.sample]}
          ]},
          {cols: 2, submodules: [
            {type: 'img', picture: i1, caption: Picture.find(i1).image.caption}
          ]},
          {cols: 1, submodules: [
            {type: 'article', piece: p2, headline: Piece.find(p2).article.headline, lede: Piece.find(p2).article.lede},
            {type: 'article', piece: p3, headline: Piece.find(p3).article.headline, lede: Piece.find(p3).article.lede}
          ]}
        ]},
        {modules: [
          {cols: 1, submodules: [
            {type: 'img', picture: i2, caption: Picture.find(i2).image.caption}
          ]},
          {cols: 1, submodules: [
            {type: 'article', piece: p4, headline: Piece.find(p4).article.headline, lede: Piece.find(p4).article.lede}
          ]},
          {cols: 1, submodules: [
            {type: 'article', piece: p5, headline: Piece.find(p5).article.headline, lede: Piece.find(p5).article.lede}
          ]},
          {cols: 1, submodules: [
            {type: 'img', picture: i3, caption: Picture.find(i3).image.caption}
          ]}
        ]}
      ]
    end

    Homepage.destroy_all
    h = Homepage.create(layout: homepage_layout)

    h.published!
  end
end
