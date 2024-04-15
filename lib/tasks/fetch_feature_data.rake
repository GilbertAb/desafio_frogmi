require 'httparty'
require 'json'

# Fetch features data from https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson
# Data is in GeoJSON format
# A Feature is a seismological event
namespace :fetch_feature_data do
    desc "Fetch seismic data of past 30 days from USGS"
    task :get => :environment do
        # TODO: implement
    end
end
