### Goals
- Self-updating
- Supports Docker, Tailscale, etc for contained workflows
- Reliable, easy to rollback and recover
- Secure, robust options for hardening

### Candidates
##### Fedora Server
- Traditional desktop
- Very familiar, unlikely to get in the way
- Can update most things while the server remains online
	- Could be less stable
##### Fedora CoreOS
- Immutable, similar to Silverblue
- Must be defined in a config file — Ignition
	- Could be a pain, could be nice to use to deploy servers like an off-site backup
	- This could allow us to very simply deploy
##### OpenSUSE MicroOS
- Immutable, uses BTRFS snapshots for rollbacks
	- This includes the whole root drive, including configs
	- Could be more useful for rolling back major breaking changes
- Does not necessarily need a config file, but can be deployed with one
- This is likely a much more approachable option for immutability 