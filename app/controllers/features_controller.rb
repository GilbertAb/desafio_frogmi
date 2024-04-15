class FeaturesController < ApplicationController
  MAX_PER_PAGE = 1000
  ALLOWED_MAG_TYPES = ["md", "ml", "ms", "mw", "me", "mi", "mb", "mb_lg", "mh", "mw", "mwr", "mww"]
  
  def index
    # Get all features from the database
    features = Feature.all
    
    # Filter by mag_type if given
    if params[:mag_type].present? && ALLOWED_MAG_TYPES.include?(params[:mag_type])
      mag_types = params[:mag_type].split(',')
      features = features.where(mag_type: mag_types)
    end

    # Filter by per_page
    # Parameter to decide the number of features shown per page
    per_page = params[:per_page].to_i
    # Show 20 results per page if "per_page" is not given. Show max 1000 results
    per_page = per_page == 0 ? 20 : [per_page, MAX_PER_PAGE].min
    
    # Pagination
    features_data = features.paginate(page: params[:page], per_page: per_page)


    # Format the data
    formatted_data = features_data.map do |feature|
      time = Time.at(feature.time) # Convert timestamp
      {
        id: feature.id,
        type: "feature",
        attributes: {
          external_id: feature.external_id,
          magnitude: feature.mag,
          place: feature.place,
          time: time.strftime("%Y-%m-%dT%H:%M:%SZ"),
          tsunami: feature.tsunami,
          mag_type: feature.mag_type,
          title: feature.title,
          coordinates: {
            longitude: feature.longitude,
            latitude: feature.latitude
          }
        },
        links: {
          external_url: feature.url
        }
      }
    end

    # Devolver los datos formateados junto con la información de paginación
    render json: {
      data: formatted_data,
      pagination: {
        current_page: features_data.current_page,
        total: features_data.total_entries,
        per_page: features_data.per_page
      }
    }
  end
end
