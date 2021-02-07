#!/usr/bin/env node
// https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/

const fs = require('fs');
const path = require('path');
const util = require('util');
const stat = util.promisify(fs.stat);
const { exec } = require("child_process");

module.exports = function (ctx) {

    // Make sure android platform is part of build
    if (!ctx.opts.platforms.includes('android')) return;

    const projectRoot = ctx.opts.projectRoot;
    const projectName = projectRoot.substring(projectRoot.lastIndexOf('/') + 1);
    const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
    let apkFileLocation = null;
    if (ctx.opts.options.release) {
        apkFileLocation = path.join(platformRoot, 'app/build/outputs/apk/release/app-release.apk');
    } else {
        apkFileLocation = path.join(platformRoot, 'app/build/outputs/apk/debug/app-debug.apk');
    }

    return stat(apkFileLocation).then(stats => {
        console.log(`Please wait while sending the app to the telegram`);

        exec(`telegram-send --file ${apkFileLocation}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }

            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            exec(`telegram-send "${projectName} 👆"`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }

                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }

                console.log(`App has been successfully sent to telegram`)
            });
        });
    });
};