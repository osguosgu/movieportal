json.array!(@hubs) do |hub|
  json.extract! hub, :id, :name, :description, :user_id
  json.url hub_url(hub, format: :json)
end
