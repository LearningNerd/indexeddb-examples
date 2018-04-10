console.log('JavaScript file loaded :) Testing IndexedDB database setup:');

// References / tutorials used:
// https://developers.google.com/web/ilt/pwa/working-with-indexeddb
// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

const DB_NAME = "setup-test";
const DB_VERSION = 1;

// IIFE!!! If no browser support, don't run any of the code in this function
(function() {
  'use strict';

  //check for support
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }

  
  // FIRST, OPEN A DATABASE -- reference:
  // https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open
      // indexedDB.open(name);
      // indexedDB.open(name, version);
          // RETURNS: A IDBOpenDBRequest object on which subsequent events related to this request are fired.
          // https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest
  var openDbRequest = window.indexedDB.open(DB_NAME, DB_VERSION);    
  console.log("Created openDbRequest:");
  console.log(openDbRequest);
  
  // HANDLE UPGRADE NEEDED EVENT -- triggered by open() first time it's run, or if version number changes
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest/onupgradeneeded
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeEvent
  openDbRequest.addEventListener("upgradeneeded", handleUpgradeDb);
    function handleUpgradeDb (event) {
      console.log("'upgradeneeded' event triggered! Event: ");
      console.log(event);
      
      console.log("db: ");
      var db = openDbRequest.result;
      console.log(db);
    }
  
  // HANDLE SUCCESS EVENT (triggered after "upgradeneeded"):
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest
  openDbRequest.addEventListener("success", handleOpenDbSuccess);
    function handleOpenDbSuccess (event) {
      console.log("Open DB request: success! Event: ");
      console.log(event);
      
      var db = openDbRequest.result;
    }
  
  // HANDLE ERROR EVENT
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest/error
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest
  openDbRequest.addEventListener("error", handleOpenDbError);
    function handleOpenDbError (event) {
      console.log("Open DB request: error! " + openDbRequest.error);
      console.log("Event object: ");
      console.log(event);
    }

})(); // End of IIFE
