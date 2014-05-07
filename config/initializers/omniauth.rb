OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '257672207770185', 'b393cc92b3bd033f6684b467774ca2a9' , {:client_options => {:ssl => {:verify => false}}} 
end

