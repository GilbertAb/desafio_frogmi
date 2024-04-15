class CommentsController < ApplicationController
    # To deactivate CSRF protection to send requests
    skip_before_action :verify_authenticity_token
    before_action :set_feature

    # Creates a comment, saves it and shows message
    def create
        @comment = @feature.comments.build(comment_params)
        puts "CREATED"
        if @comment.save
            render json: @comment, status: :created
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    private
    
    # Set feature associated to the comment 
    def set_feature
        @feature = Feature.find(params[:feature_id])
    end
    # Specify parameter
    def comment_params
        params.permit(:body)
    end
end
