require 'httparty'
require 'json'

# Fetch features data from https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson
# Data is in GeoJSON format
# A Feature is a seismological event
namespace :fetch_feature_data do
    desc "Fetch seismic data of past 30 days from USGS"
    task :get => :environment do
        # HTTP request
        response = HTTParty.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')

        if response.success?
            # A feature is an earthquake
            # Parse the features to hashes
            features = JSON.parse(response.body)['features']
            
            features.each do |feature|
                save_feature(feature['id'], feature['properties'], feature['geometry'])
            end
        else
            puts "Failed to fetch feature data: #{response.code}"
        end
    end

    def save_feature(id, properties, geometry)
        # Create a feature model
        feature = Feature.new(
            external_id: id,
            mag: properties['mag'],
            place: properties['place'],
            time: properties['time'],
            url: properties['url'],
            tsunami: properties['tsunami'],
            mag_type: properties['magType'],
            title: properties['title'],
            longitude: geometry['coordinates'][0],
            latitude: geometry['coordinates'][1]
        )

        if feature.valid?
            feature.save
            puts "Saved feature: #{properties['id']}"
        else
            puts "Error saving feature: #{feature.errors.full_messages.join(', ')}"
        end
    end

    def feature_exists?(externnal_id)
        Feature.exists?(external_id: external_id)
    end
end
