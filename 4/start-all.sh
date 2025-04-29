#!/bin/bash
concurrently \
  "cd alter-service && node api.js" \
  "cd control-service && node api.js" \
  "cd dom-service && node api.js" \
  "cd interract-service && node api.js" \
  "cd style-service && node api.js"