### Why BTRFS?
- Very scalable across drives — RAID can be enabled and modified on the fly
	- Adding more drives or replacing a failed one will be very low impact and simple
- Snapshotting allows for version control with a very minimal impact on storage
- Self healing through periodic scrubbing to help prevent data loss
- Supports compression to improve storage efficiency and speed
- Built in to the kernel, easy to deploy and migrate
### Migration
- Switching to BTRFS was easy, on my desktop I just reformatted my secondary drive and started an rclone to move the data over to the new partition
- Then, all I had to do was add the other drive to the volume and run a `balance` to convert the drive
- I should have enabled compression before adding data to save time, but I activated it afterwards
### Performance
- Using ZSTD compression saved me 11% of my data, or over 100gbs
```
$ sudo compsize vault/
Processed 257189 files, 4524094 regular extents (4524094 refs), 72685 inline, 486059 fragments.
Type       Perc     Disk Usage   Uncompressed Referenced  
TOTAL       89%      1.0T         1.1T         1.1T       
none       100%      911G         911G         911G       
zstd        59%      183G         308G         308G
```
- Performance of the array for reads was very strong at nearly 200MB/s which is nearing my current 1gbps connection limit
	- Random read/write performance isn't so good, as expected for mechanical drives
![[Pasted image 20251106095831.png]]