# HELP

# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# NPM TASKS

# Install
install-dependencies: ## Install all project dependencies
	npm run install-dependencies

# Build the source
build: ## Build both api and client project
	npm run build

# Run the applications
run-api: ## Run API server
	cd api && npm start

run-client: ## Run React application
	cd client && npm start
