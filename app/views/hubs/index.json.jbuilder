json.array!(@hubs) do |hub|
  json.(hub, :id, :name, :description, :privacy)
  json.url hub_url(hub, format: :json)
  json.is_member hub.users.include?(current_user)
  json.is_admin hub.admin_users.include?(current_user)

end
