require 'rails_helper'

RSpec.describe "Api::CartProducts", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/cart_products/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/api/cart_products/create"
      expect(response).to have_http_status(:success)
    end
  end

end
