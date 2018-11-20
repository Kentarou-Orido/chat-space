FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image Rack::Test::UploadedFile.new(File.join('http://placehold.jp/300x300.png')
    user
    group
  end
end
