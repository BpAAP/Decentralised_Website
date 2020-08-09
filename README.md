# Fully decentralised website system.

# All of this is now outdated, needs to be updated, with some better explanation

## Plan:
1. Point .eth address to handler.index
2. Handler shows splashscreen.
3. Checks a set of .eth sub-domains to load most recent major version of website.
4. Checks a set of ipns domains to look for most recent minor version, informs to user of this.
6. Check a set of ipns domains to look for most recent banner message to display.
5. These check continue at a regular interval.

## Setup
### Hosting on IPFS:
Add the folder containing the website to IPFS, call the hash of this folder `HASH_SITE`
Add the folder containing the packages to IPFS, call the hash of the folder `HASH_PACKAGES`
Add the folder containing the handler to IPFS, call the hash of the folder `HASH_HANDLER`
Set the URL in the pointer file to `~~~some gateway~~~/ipfs/HASH_POINTER`
Add the pointer file to IPFS and let the hash be `HASH_POINTER`

Do the last 3 each time you update the site, and choose if 'Setting ENS' or 'Setting IPNS' is appropriate.

### Setting up ENS (.eth):
Acquire an .eth domain, let this be `x.eth`.
Create a set of major version domains, for example `major_a.x.eth` and `major_b.x.eth`. Two are recommended, as when a new major version is being added to one, the other needs to be available as a fallback containing the previous version.
Major versions will be loaded near instantly. But require an ethereum transaction to update, meaning a small cost.

Set the content entry for `x.eth` to `HASH_POINTER`
For `major_a.x.eth` and `major_b.x.eth` set the content entry on one to `HASH_SITE`, when you want to publish a new major version, set the new `HASH_SITE` on alternating subdomains. So one always points to the newest `HASH_SITE` and the other to the one major version out-of-date `HASH_SITE`

### Setting up IPNS
Generate a set of IPFS keys `minor_a` and `minor_b`, publish `HASH_SITE` as an IPNS, of the most recent minor version , alternating the key used as before. So one points to the most recent minor `HASH_SITE` and the other to the one minor version out-of-date `HASH_SITE`.

### Folder Stucture
All of the published sites should contain a version.txt file containing information about the version of the site that folder contains. See example.
