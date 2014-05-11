json.(@hub, :id, :name, :description, :privacy, :created_at)
json.users @hub.hub_users do |json, hub_user|
    json.id hub_user.user.id
    json.name hub_user.user.name
    json.image hub_user.user.image
    json.is_admin hub_user.is_admin
    json.joined hub_user.created_at
end
