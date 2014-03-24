# Movie Portal

## Installation

1. Install [Ruby][ruby]
2. Install [RVM][rvm]: `\curl -sSL https://get.rvm.io | bash -s stable`
3. Install [Heroku toolbelt][herokutb]
4. Run: 

		rvm install ruby-2.1.1
		rvm --create 2.1.1@movieportal
		rvm use 2.1.1@movieportal

5. Clone this repo
6. Enter in repo directory
7. Run:

		bundle install --without production

8. Run `foreman start`
9. Open browser and go to http://localhost:8080

[ruby]: https://www.ruby-lang.org/en/
[rvm]: https://rvm.io/rvm
[herokutb]: https://toolbelt.heroku.com/
