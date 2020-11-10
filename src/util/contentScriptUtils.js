/*
Even after declaratively or programmatically injecting scripts into the DOM shared by the client app
content scripts run in a sandbox and have no access to the variable used by the client. 

This injects a script element into the shared DOM. Depending on what script we run in the shared
DOM, we can potentially retrieve client variables from the window object. 

Running this in a conetentScript essentially allows us to break out of the contentScript's 
sandboxed context.
*/

import { print } from 'graphql/language/printer';

export const newPrint = print;

const injectAndRunInDom = (method, ...args) => {
  // The stringified method which will be parsed as a function object.
  const stringifiedMethod = method instanceof Function ? method.toString() : `() => { ${method} }`;

  // The stringified arguments for the method as JS code that will reconstruct the array.
  const stringifiedArgs = JSON.stringify(args);

  // The full content of the script tag.
  const scriptContent = `
    // Parse and run the method with its arguments.
    (${stringifiedMethod})(...${stringifiedArgs});

    // Remove the script element to cover our tracks.
    document.currentScript.parentElement
      .removeChild(document.currentScript);
  `;

  // Create a script tag and inject it into the document.
  const scriptElement = document.createElement('script');
  scriptElement.innerHTML = scriptContent;
  document.documentElement.prepend(scriptElement);
};

export default injectAndRunInDom;
