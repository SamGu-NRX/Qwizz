"use client";
import React from 'react';
import IntroJs from 'intro.js';
import 'intro.js/minified/introjs.min.css';

const Onboarding = () => {
    React.useEffect(() => {
    const intro = IntroJs();
    intro.setOptions({
      steps: [
        {
          title: 'Welcome to StudyBuddy!',
          intro: 'Hello Arthur lol',
        //   buttons: [
        //     {
        //       text: 'No',
        //       class: 'introjs-skipbutton',
        //       action: function() {
        //         intro.exit();
        //       }
        //     },
        //     {
        //       text: 'Yes',
        //       class: 'introjs-nextbutton',
        //       action: function() {
        //         // Here you can start your actual tutorial
        //         // For example:
        //         // startTutorial();
        //         intro.nextStep();
        //       }
        //     }
        //   ]
        }
      ]
    });
    intro.start();
  }, []);

  return null;
};
export default Onboarding;