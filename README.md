# Fully decentralised website system.

# All of this is now outdated, needs to be updated, with some better explanation

## Aim:
To provide a system for maintaining a decentralised website with decentralised name resoultion.

## How it works
Versions of the site are hosted on IPFS, later versions having higher version numbers.
In practice this means that there is a version.txt file in the home directory of the site, which on its first line has:
`V:n` where n is the version number of the site.

The user navigates to an ENS domain, let this be `x.eth`. For Web3.0 access this is `x.eth`, for Web2.0 its `x.eth.link`. This resolves to a file called `pointer.html`, which points to another site called `handler.html`.
`handler.html` load a 'major' version of the site from its `major_url` path into a full page iframe allowing the visitor to have recent access to a mostly up-to-date site instantly. The handler then periodically checks a pair of IPNS paths to see if a newer 'minor' version of the site is available. If so, that site is loaded.

## Initial Setup
1. Install IPFS, testing was done on the go version. Follow official instructions.
2. Clone this repo to a PC
3. Use the command `ipfs daemon` in one terminal to start the ipfs daemon.
4. In a different terminal window, use `ipfs key gen --type=rsa --size=2048 minor_a_IPNS` and `ipfs key gen --type=rsa --size=2048 minor_b_IPNS` to generate two IPNS key for publishing minor version updated site to later. Call these `IPNS_HASH_A` and `IPNS_HASH_B`.
5. Place your website into the folder `/site` such that its `index.html` is in that folder. Make sure `/site` contains a file called `version.txt` whose first line is: `V:0`.
6. Use `ipfs add site -r` to add V0 of the site to IPFS. Let the CID (Hash given by IPFS in terminal) for `site` (the folder not the html file inside the folder) be `SITE_HASH`. Example: IPFS will print a line `added QmVs5kp5dz1hjHzqWmChHRRcGQ4zaCbFA9bWJ87YAibWtC site`, the long string is `SITE_HASH`.
7. In `/handler/handler.js` set `major_url = SITE_HASH` near the top of the file.
8. In the same file set `minor_a_IPNS = IPNS_HASH_A` and `minor_b_IPNS = IPNS_HASH_B`. Near the top of the file.
9. Just for initial setup, use `ipfs name publish --key=minor_a_IPNS SITE_HASH` and `ipfs name publish --key=minor_b_IPNS SITE_HASH`, these will each take a minute or two.
10. Add `/packages` to IPFS with `ipfs add packages -r` and let the hash of the packages folder be `PACKAGES_HASH`
11. In the file `/handler/index.html` set the `href` on line 9 to `/ipfs/PACKAGES_HASH/bootstrap.min.css`
12. In the same file set all of line 29, 30 and 31 in a similar way adding the appropriate `PACKAGES_HASH`.
13. Add `/handler` to IPFS by `ipfs add handler -r`, let the hash of the handler folder be `HANDLER_HASH`.
14. Set the hash in `pointer.html` to `HANDLER_HASH`.
15. Add `pointer.html` to IPFS with `ipfs add pointer.html` let the hash of this be `POINTER_HASH`.
16. Acquire an ENS (.eth) domain and set the content entry to `/ipfs/POINTER_HASH`

## To Publish major version.
Make the changes you want to the site folder, Make sure to increase the version in version.txt. Do steps 6,7,13,14,15,16

## To Publish minor version. 
Make the changes you want to the site folder, Make sure to increase the version in version.txt. Do step 6, do step 9 with only one key. All users who already have the site open will be redirected to the updated version as will new visits
