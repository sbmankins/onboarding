# Onboarding

<h2>Starting App</h2>
To start in Dev</br>
In the top project directory, run:</br>
$ npm install</br>
$ npm run dev</br>

<h2>Customization required</h2>
<ul>
<li>Development and Production keys are in server/config</li>
<li>Create dev.js in config folder</br>
module.exports = { </br>
    mongoURI:
        'YOUR STRING HERE', </br>
    slackAPI:
        'YOUR STRING HERE', </br>
    conversationID: 'YOUR STRING HERE', </br>
};</br>
</li>
<li>Add desired strings and environment variables to dev.js & prod.js</li>
<li>Populate collections with required data for drop downs</li>
<li>Statuses collection must contain: “Complete, Roadblock, On hold, In progress”</li>
<li>Replace Amber link in server/client/components/NavBar.js</li>
</ul>
