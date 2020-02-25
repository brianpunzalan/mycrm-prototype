FROM node

ARG APP_HOME
ENV NODE_ENV production
ENV PORT 8080

# Change Workdirectory
WORKDIR $APP_HOME

# Check NPM package
RUN npm -v

# Install app dependencies
COPY package.json $APP_HOME
RUN npm install

# Copy source code
COPY . $APP_HOME

CMD ["node", "./server"]

EXPOSE $PORT
STOPSIGNAL SIGINT