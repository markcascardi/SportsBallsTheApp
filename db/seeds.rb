# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Season.destroy_all
Sport.destroy_all
Athlete.destroy_all
Team.destroy_all

fall_spring_seasons = ["2015", "2016", "2017", "2018", "2019"]
winter_seasons = ["2015-2016", "2016-2017", "2017-2018", "2018-2019", "2019-2020"]

fall_spring_sports = [["Baseball", "M"], ["Football", "M"], ["Golf", "M"], ["Lacrosse", "M"], ["Soccer", "M"], ["Tennis", "M"], ["Field Hockey", "W"], ["Golf", "W"], ["Lacrosse", "W"], ["Rowing", "W"], ["Soccer", "W"], ["Softball", "W"], ["Tennis", "W"], ["Volleyball", "W"]]
winter_sports = [["Basketball", "M"], ["Track & Field", "M"], ["Wrestling", "M"], ["Basketball", "W"], ["Track & Field", "W"]]

fall_spring_seasons.each do |year|
  season = Season.create(name: year)
  fall_spring_sports.each do |sport_info|
    sport = Sport.find_or_create_by(name: sport_info[0], gender: sport_info[1])
    Team.create(season: season, sport: sport)
  end
end

winter_seasons.each do |year|
  season = Season.create(name: year)
  winter_sports.each do |sport_info|
    sport = Sport.find_or_create_by(name: sport_info[0], gender: sport_info[1])
    Team.create(season: season, sport: sport)
  end
end

bsb2019 = Team.where(season: Season.where(name: "2019"), sport: Sport.where(name: "Baseball", gender: "M")).first
bb2019 = Team.where(season: Season.where(name: "2019-2020"), sport: Sport.where(name: "Basketball", gender: "M")).first
fb2019 = Team.where(season: Season.where(name: "2019"), sport: Sport.where(name: "Football", gender: "M")).first
sw2019 = Team.where(season: Season.where(name: "2019"), sport: Sport.where(name: "Soccer", gender: "W")).first
vb2019 = Team.where(season: Season.where(name: "2019"), sport: Sport.where(name: "Volleyball", gender: "W")).first
bb2018 = Team.where(season: Season.where(name: "2018-2019"), sport: Sport.where(name: "Basketball", gender: "M")).first

Athlete.create(team: bsb2019, firstname: "Aaron", lastname: "Sabato", birthdate: "June 4, 1999", number: "19", year: "Jr", height: "6-2", weight: 230, city: "Rye Brook", state: "NY", high_school: "Brunswick School", ig_handle: "aaron_sabato14", biography: "He was born as a child...", image_url: "https://goheels.com/images/2020/2/11/Sabato_Aaron_2020_bb_103.jpg?width=300")
Athlete.create(team: bb2019, firstname: "Garrison", lastname: "Brooks", birthdate: "June 29, 1999", number: "15", year: "Sr", height: "6-9", weight: 235, city: "Lafayette", state: "AL", high_school: "Auburn", ig_handle: "garrison_brooks", biography: "It all started in the beginning...", image_url: "https://goheels.com/images/2019/9/19/Brooks_Garrison_72.JPG?width=300")
Athlete.create(team: sw2019, firstname: "Brianna", lastname: "Pinto", birthdate: "May 5, 2000", number: "8", year: "So", height: "5-5", weight: 125, city: "Durham", state: "NC", high_school: "Jordan", ig_handle: "b.pinto", biography: "And then she learned soccer", image_url: "https://goheels.com/images/2019/8/9/Pinto_Brianna_2019_110.jpg?width=300")
Athlete.create(team: fb2019, firstname: "Dyami", lastname: "Brown", birthdate: "November 1, 1999" , number: "2", year: "Jr", height: "6-0", weight: 195, city: "Charlotte", state: "NC", high_school: "West Mecklenberg", ig_handle: "_dyamibrown", biography: "Charlotte is home...", image_url: "https://goheels.com/images/2019/4/30/Brown_Dyami_fb_2019_358.jpg?width=300")
Athlete.create(team: vb2019, firstname: "Destiny", lastname: "Cox", birthdate: "March 21, 2000", number: "1", year: "Jr", height: "6-1", weight: 150, city: "Carrboro", state: "NC", high_school: "Chapel Hill", ig_handle: "destinycox", biography: "Her mom was fast...", image_url: "https://goheels.com/images/2019/7/30/Cox_Destiny_2019vb_188.jpg?width=300")
Athlete.create(team: bb2019, firstname: "Armando", lastname: "Bacot", birthdate: "March 6, 2000", number: "5", year: "So", height: "6-10", weight: 232, city: "Richmond", state: "VA", high_school: "IMG Academy", ig_handle: "armando", biography: "VA then FL now NC", image_url: "https://avatars1.githubusercontent.com/u/7359?s=100&v=4")
Athlete.create(team: bb2018, firstname: "Coby", lastname: "White", birthdate: "February 16, 2000", number: "2", year: "Fr", height: "6-5", weight: 195, city: "Goldsboro", state: "NC", high_school: "Greenfield School", ig_handle: "cobywhite", biography: "The 910 i think...", image_url: "https://goheels.com/images/2019/7/30/Cox_Destiny_2019vb_188.jpg?width=300")
