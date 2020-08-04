# Fully decentralised website system.

## Aim:
Develop a framework for deploying entirely decentralised websites
on IPFS while fixind some of the usual issues with this sort of setup:
1. Provide a user-memorable way of navigating to the site, namely through EDS using Ethereum based resolution. Providing a way for both Web 2.0 and 3.0 users to reach the site.
2. (An extension to point 1) Provide a mechanism for updating the content of the website and directing users to the most up-to-date version.
3. Fix distribution issue with IPFS data being purged from the network. Use In-browser js-ipfs node to access data faster and to host it for others. With enough round the clock users this should make distribution easy. Only one 'data introduction' node would be required to pin content. (Perhaps only initially).

## Plan:
IPFS is used to store all the content. 

1. Viewer navigates to "handler" static site using x.eth (Web 3.0) or x.eth.link (Web 2.0). This site is hosted on IPFS and will not need to be changed when content is added.

2. "handler" will show a "Working on it" splash screen by default, though ideally content delivery would be fast enough for the user to never see it. "handler" is preprogrammed to look at a set of subdomains such as one.x.eth or two.x.eth and so on. These will link to OR contain a text entry for a "directory" file. The "handler" will serve the latest available version.

3. "directory" files contain data related to the use and CID of content on the site such as articles, posts, images or videos. They also contain a timestamp.

4. The "handler" will attempt to load these "directory" files, and find the newest one available. This is necessary as when the website changes, and the oldest subdomain now links to the newest version, it may take time for this version to be available, so the previous version will be served until the newest one is available.

5. All of the interactions of the "handler" with the IPFS network will be through a client side js-ipfs node in the browser. While the page in loaded some content will be pinned in this node to help with content delivery to other users.

## Todo:
