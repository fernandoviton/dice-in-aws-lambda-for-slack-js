# dice-in-aws-lambda-for-slack-js
Given text based dice to roll format, returns rolled results in slack compatible format

# Building locally (on Windows - though is possible to build elsewhere)

You will need to have npm installed and available to your shell: https://docs.npmjs.com/cli/v7/configuring-npm/install

Then in your shell, install jasmine test engine globally as that is easiest and works with steps below
```
npm install -g jasmine
```

Clone the repo
```
git clone https://github.com/fernandoviton/dice-in-aws-lambda-for-slack-js.git
cd dice-in-aws-lambda-for-slack-js.git
```

Run all the tests.  The tests are the only way to interact with this at the moment.  There is a handler function in the code which is what allows AWS lamda to call it when deployed, but I don't have anything here setup to mimic that.  Instead add new test cases.
```
jasmine .\spec\*.js
```

# References
* http://jasmine.github.io/2.3/node.html
