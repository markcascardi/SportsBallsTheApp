require "open-uri"

class Scraper

  BASE_URL = "https://goheels.com/sports/"

  def self.scrape_womens_soccer
    url = "#{BASE_URL}womens-soccer/roster"
    doc = Nokogiri::HTML(open(url))
    puts "### Search for nodes by css"
    doc.css('.sidearm-roster-templates-container tr').each do |player|
      name = player.css('.sidearm-table-player-name').last.text.strip
      number = player.css('.roster_jerseynum').last.text.strip
      height = player.css('.height').last.text.strip
      class = player.css('.roster_class').last.text.strip
      city = player.css('.hometownhighschool').last.text.strip.split(" ")[0].split("").slice(0, -1).join("")
      state = player.css('.hometownhighschool').last.text.strip.split(" ").slice(1,2)[0]
      high_school = player.css('.hometownhighschool').last.text.strip.split(" ").slice(3).join(" ")
      Athlete.create()
    end
  end
end
str = str.substring(0,str.length() - 1)

firstname, :lastname, :birthdate,
               :number, :year, :height, :weight, :city, :state, :high_school,
               :ig_handle, :biography, :image_url

# require 'nokogiri'
# require 'open-uri'

film_elements.map do |film|
  name = film.css("a").first.text
  year = film.css(".year_column").first.text.gsub(/\W/, "")
  film_page = film.css("a")[0]["href"]
  ActorFinder::Film.new(name, year, actor, film_page)
end


('.sidearm-table-player-name').last.text.strip
