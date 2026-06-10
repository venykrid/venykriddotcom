---
layout: ../../layouts/DocsLayout.astro
title: Venykrid's Home Lab
---

My homelab is the product of heavy planning, research, and adaptation as I learned how to build a proper server enviroment and a secure network

### Goals
- Reliable and performant networking and self hosted services
- Value focused components, the best I can get without blowing the bank

### Hardware
- [Rack Design](/docs/homelab/rackdesign): 10" custom rack made with 2020 aluminum extrusion and a 3d printer
- [Network](/docs/homelab/network): Ubiquiti equipment, Tailscale, and Cloudflare and how I manage my network to keep these services secure and accessible
- [Storage](/docs/homelab/storage): BTRFS RAID 1, TPM-backed encryption, and offsite backups
- Server: Nothing special, just an OptiPlex 3080 Micro that I picked up at a garage sale with an m.2 i226-v network card 

### Software
- [OS](/docs/homelab/os): OpenSUSE MicroOS and how I manage full disk encryption and automatic seamless updates with no intervention on a server
- [Podman](/docs/homelab/podman): Runs all my applications in containers with hardened permissions, all integrated with Systemd for easy monitoring and control
  - [Minecraft](/docs/homelab/minecraft): Fabric Minecraft server hosted through Cloudflare
  - Jellyfin: Self-hosted ome video streaming platform