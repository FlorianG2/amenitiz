require "test_helper"

class Api::ProductsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_products_index_url
    assert_response :success
  end
end
