- When a new region becomes available, it might take a few weeks before host capacity also becomes available.

To obtain a list of shapes available to you, run the [ListShapes](https://docs.oracle.com/iaas/api/#/en/iaas/latest/Shape/ListShapes) operation.

- If your instance uses [stateful security rules](https://docs.oracle.com/iaas/Content/Network/Concepts/securityrules.htm#stateful), each instance has a [maximum number of concurrent connections](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#connection-tracking) that can be tracked, based on the instance's shape.

## Compute Shape Pricing 🔗

You can use the [Cost Estimator](https://www.oracle.com/cloud/cost-estimator.html) to estimate your expected monthly project costs with Oracle Cloud Infrastructure. For detailed information about billing, see [Billing and Cost Management](https://docs.oracle.com/iaas/Content/Billing/home.htm) and the Oracle Compute Cloud Services section of [Oracle PaaS and IaaS Universal Credits Service Descriptions](https://www.oracle.com/assets/paas-iaas-universal-credits-3940775.pdf).

OCPUs and vCPUs

Oracle measures compute resource pricing differently. The Oracle CPU (OCPU) represents physical CPU cores and is the unit of measurement for CPUs on x86 CPUs (AMD and Intel) and Arm CPUs (OCI Ampere Compute). A virtual CPU (vCPU), the industry-standard for measuring compute resources, represents one execution thread of a physical CPU core.

Most CPU architectures, including x86, runs two threads per physical core, so one OCPU is the equal of two vCPUs for x86-based compute. For OCI
Compute, the minimum unit of provisioning starts from one OCPU on both X86 (Intel and AMD) and OCI Ampere Compute processors.

The following are the provisioning units for compute instances:

- 1 OCPU on Arm A1 (Compute) = 1 core on Arm A1 (Compute) or 1 vCPU
- 1 OCPU on Arm A2 (Compute) and A4 (Compute) = 2 cores on Arm A2 (Compute) and A4 (Compute) or 2 vCPUs
- 1 OCPU on x86 (AMD and Intel) = 2 vCPUs

For more information, see [Cloud Price List](https://www.oracle.com/cloud/price-list.html#compute-vm). In addition, you can read this blog post on [vCPU and OCPU pricing information](https://blogs.oracle.com/cloud-infrastructure/post/vcpu-and-ocpu-pricing-information).

## Flexible Shapes 🔗

A flexible shape is a shape that lets you customize the number of OCPUs and the amount of memory when launching or resizing your VM. When you [create a VM instance](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/launchinginstance.htm "Create a bare metal or virtual machine (VM) compute instance.") using a flexible shape, you select the number of OCPUs and the amount of memory that you need for the workloads that run on the instance. The network bandwidth and number of VNICs scale proportionately with the number of OCPUs. This flexibility lets you build VMs that match your workload, enabling you to optimize performance and minimize cost.

The flexible shapes are:

- VM.Standard3.Flex (Intel)
- VM.Standard.E4.Flex (AMD)
- VM.Standard.E5.Flex (AMD)
- VM.Standard.E6.Flex (AMD)
- VM.Standard.A1.Flex (Altra processor from Ampere)
- VM.Standard.A2.Flex (AmpereOne processor from Ampere)
- VM.Standard.A4.Flex (AmpereOne-M processor from Ampere)
- VM.DenseIO.E4.Flex (AMD)
- VM.Optimized3.Flex (Intel)

Flexible memory is also available on flexible shapes. The amount of memory allowed is based on the number of OCPUs selected.

For [standard](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vm-standard) and [optimized](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vm-hpc-optimized) flexible shapes, the ratio of memory to OCPUs depends on the shape.

| Shape | Maximum OCPUs | Minimum Memory | Maximum Memory |
| --- | --- | --- | --- |
| VM.Standard3.Flex | 32<br>See [Extended Memory VM Instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/extended-memory-vm-instances.htm "Extended memory virtual machine (VM) instances are VM instances that provide more memory and cores than available with standard shapes."). | 1 GB or a value matching the number of OCPUs, whichever is greater | 64 GB per OCPU, up to 512 GB total<br>See [Extended Memory VM Instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/extended-memory-vm-instances.htm "Extended memory virtual machine (VM) instances are VM instances that provide more memory and cores than available with standard shapes."). |
| VM.Standard.E4.Flex | 64<br>See [Extended Memory VM Instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/extended-memory-vm-instances.htm "Extended memory virtual machine (VM) instances are VM instances that provide more memory and cores than available with standard shapes."). | 1 GB or a value matching the number of OCPUs, whichever is greater | 64 GB per OCPU, up to 1024 GB total<br>See [Extended Memory VM Instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/extended-memory-vm-instances.htm "Extended memory virtual machine (VM) instances are VM instances that provide more memory and cores than available with standard shapes."). |
| VM.Standard.E5.Flex | 126 | 1 GB or a value matching the number of OCPUs, whichever is greater | 64 GB per OCPU, up to 1049 GB total |
| VM.Standard.E6.Flex | 126 | 1 GB or a value matching the number of OCPUs, whichever is greater | 64 GB per OCPU, up to 1454 GB total |
| VM.Standard.A1.Flex | 76<br>(OCPU is 1 core of an Altra processor) | 1 GB or a value matching the number of OCPUs, whichever is greater | 64 GB per OCPU, up to 472 GB total |
| VM.Standard.A2.Flex | 78<br>(OCPU is 2 cores of an AmpereOne processor) | 1 GB or a value matching the number of OCPUs, whichever is greater | 64 GB per OCPU, up to 946 GB total |
| VM.Standard.A4.Flex | 45<br>(OCPU is 2 cores of an AmpereOne-M processor) | 1 GB or a value matching the number of OCPUs, whichever is greater | 64 GB per OCPU, up to 700 GB total |
| VM.Optimized3.Flex | 18 | 1 GB or a value matching the number of OCPUs, whichever is greater | 64 GB per OCPU, up to 256 GB total |

For [dense I/O](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vm-dense) flexible shapes, the following configurations are available:

- 8 OCPUs, 128 GB memory
- 16 OCPUs, 256 GB memory
- 32 OCPUs, 512 GB memory

These resources are billed at a per-second granularity with a one-minute minimum.
Optimize your costs by choosing the shape that matches your workload and by changing the
shape when your workload changes. For example, you can configure the VM to maximize
compute processing power by choosing a low core-to-memory ratio. Or, for applications
like in-memory databases or big data processing engines, configure an instance with a
high core-to-memory ratio. Modify the OCPUs and memory as your workload changes, scaling
up to increase performance or scaling down to reduce costs.

### Supported Images 🔗

Most [platform images](https://docs.oracle.com/en-us/iaas/Content/Compute/References/images.htm) are compatible with flexible shapes. Use a platform image that was published after the flexible shape was released (for release dates, see [the Compute release notes](https://docs.oracle.com/iaas/releasenotes/services/compute/)).

Custom images are also supported, depending on the image. You must [add flexible shape compatibility to the custom image](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/managingcustomimages.htm#Managing_Custom_Images__console-custom-image-tasks), and then test the image on the flexible shape to ensure that it actually works on the shape.

### Supported Regions 🔗

For a list of supported regions, see the [compute instance service limits](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Compute_Instances). As host capacity becomes available in additional regions, the list is updated.

**Note**

Capacity might be limited for A1 shapes.

## Extended Memory VM Instances 🔗

[Extended memory virtual machine (VM) instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/extended-memory-vm-instances.htm "Extended memory virtual machine (VM) instances are VM instances that provide more memory and cores than available with standard shapes.") are VM instances that provide more memory and cores than available with standard shapes.

The following shapes are available for extended memory VM instances:

- VM.Standard3.Flex

- VM.Standard.E3.Flex

- VM.Standard.E4.Flex

- VM.Standard.E5.Flex


## Bare Metal Shapes 🔗

The following shapes are available for bare metal instances:

- [Standard Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#bm-standard)
- [Dense I/O Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#bm-dense)
- [GPU Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#bm-gpu)
- [HPC and Optimized Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#bm-hpc-optimized)

Network bandwidth is based on expected bandwidth for traffic within a VCN. To determine which [physical NICs are active for a shape](https://docs.oracle.com/iaas/Content/Network/Tasks/managingVNICs.htm#overview__How), refer to the network bandwidth specifications in the following tables. If the network bandwidth is listed as "2 x <bandwidth> Gbps," it means that both NIC 0 and NIC 1 are active.

For bare metal instances, optionally [configure advanced BIOS settings](https://docs.oracle.com/en-us/iaas/Content/Compute/References/bios-settings.htm "When you create a bare metal compute instance, you can optionally configure advanced BIOS settings that let you optimize performance. For example, you can disable simultaneous multithreading to optimize the NUMA settings."), such as disabling simultaneous multithreading, disabling cores, or optimizing the NUMA settings.

### Standard Shapes 🔗

Designed for general purpose workloads and suitable for a wide range of applications and use cases. Standard shapes provide a balance of cores, memory, and network resources. Standard shapes are available with Intel, AMD, and Arm-based processors.

These are the bare metal standard series:

- **BM.Standard3:** X9-based standard compute. Processor: Intel Xeon Platinum 8358. Base frequency 2.6 GHz, max turbo frequency 3.4 GHz.
- **BM.Standard.E4:** E4-based standard compute. Processor: AMD EPYC 7J13. Base frequency 2.55 GHz, max boost frequency 3.5 GHz.
- **BM.Standard.E5:** E5-based standard compute. Processor: AMD EPYC 9J14. Base frequency 2.4 GHz, max boost frequency 3.7 GHz.
- **BM.Standard.E6:** E6-based standard compute. Processor: AMD EPYC 9J45. Base frequency 2.7 GHz, max boost frequency 4.1 GHz.
- **BM.Standard.A1:**
OCI Ampere A1 Compute Arm-based standard compute. Each OCPU corresponds to a single hardware execution thread. Processor: Ampere Altra Q80-30. Max frequency 3.0 GHz.
- **BM.Standard.A4:** OCI Ampere A4 Compute Arm-based standard compute. Each OCPU corresponds to two hardware execution threads (2 cores). Processor: Ampere AmpereOne-M A06-36M. Frequency 3.6 GHz.

| Shape | OCPU | Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| BM.Standard3.64 | 64 | 1024 | Block storage only | 2 x 50 Gbps | 256 | 129 (1 on the first physical NIC, 128 on the second) |
| BM.Standard.E4.128 | 128 | 2048 | Block storage only | 2 x 50 Gbps | 256 | 129 (1 on the first physical NIC, 128 on the second) |
| BM.Standard.E5.192 | 192 | 2304 | Block storage only | 1 x 100 Gbps | 256 | 129 (1 on the first physical NIC, 128 on the second) |
| BM.Standard.E6.256 | 256 | 3072 | 2 x 960 GB NVMe<br>Block storage | 1 x 200 Gbps | 256 | 129 (1 on the first physical NIC, 128 on the second) |
| BM.Standard.A1.160<br>See [Arm-Based Compute](https://docs.oracle.com/en-us/iaas/Content/Compute/References/arm.htm "OCI Ampere Compute is a general-purpose, Arm-based compute platform based on the Ampere processor. OCI Ampere A1 Compute (based on Ampere Altra processors) and OCI Ampere A2 Compute (based on AmpereOne processors) instances provide superior price-performance, near linear scaling, built-in security due to the single-threaded core architecture, and a broad developer ecosystem."). | 160 | 1024 | Block storage only | 2 x 50 Gbps | 256 | Windows images are not supported on this shape. |
| BM.Standard.A4.48<br>See [Arm-Based Compute](https://docs.oracle.com/en-us/iaas/Content/Compute/References/arm.htm "OCI Ampere Compute is a general-purpose, Arm-based compute platform based on the Ampere processor. OCI Ampere A1 Compute (based on Ampere Altra processors) and OCI Ampere A2 Compute (based on AmpereOne processors) instances provide superior price-performance, near linear scaling, built-in security due to the single-threaded core architecture, and a broad developer ecosystem."). | 48 | 768 | 1 x 3.84TB NVMe<br>Block Storage | 1 x 100 Gbps | 256 | Windows images are not supported on this shape. |

#### **C-States and Frequency Scaling** 🔗

Modern CPUs transition to a power-saving state (called c-states) when the CPU is idle or underutilized. These c-states start at C0, which is the normal CPU operating mode (the CPU is 100% activated). The higher the c-state, the deeper the sleep mode into which the CPU transitions. The sleep modes work by cutting the clock signal and power from idle units inside the CPU, thereby reducing the energy use. As the CPU transitions to higher c-states (deeper sleep states), the longer it takes to wake up the units that are shut down. This is an undesirable side effect of c-states transitions, because it can slow down a demanding application.

Fortunately, the hypervisor on standard VM shapes manages this complexity for the end user by preventing transitions to deeper sleep states even when the CPU is underutilized. In addition, it disables c-states when it sees sustained high utilization. When c-states are disabled, the CPU operates in C0 state, where all cores are active at base frequency. Each processor manufacturer names the maximum frequency per core differently; for Intel the maximum frequency is named max turbo frequency, and for AMD it is called max boost frequency. This maximum frequency is realized by the respective CPU's built-in algorithms when the processor is running in C0 state under normal but sustained load.

Currently, the hypervisor does not allow the client operating system running in the instance to manage the c-states using kernel command line options. The client always shows the base frequency, even when the hypervisor is running the processor at the maximum frequency advertised by the processor.

### Dense I/O Shapes 🔗

Designed for large databases, big data workloads, and applications that require high-performance local storage. DenseIO shapes include locally-attached NVMe-based SSDs.

This is the bare metal dense I/O series:

- **BM.DenseIO.E4:** E4-based dense I/O compute. Processor: AMD EPYC 7J13. Base frequency 2.55 GHz, max boost frequency 3.5 GHz.
- **BM.DenseIO.E5:** E5-based dense I/O compute. Processor: AMD EPYC 9J14. Base frequency 2.6 GHz, max boost frequency 3.7 GHz.

| Shape | OCPU | Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| BM.DenseIO.E4.128 | 128 | 2048 | 54.4 TB NVMe SSD Storage (8 drives) | 2 x 50 Gbps | 256 | 129 (1 on the first physical NIC, 128 on the second) |
| BM.DenseIO.E5.1281 | 128 | 1536 | 81.6TB NVMe SSD Storage (12 x 6.8TB drives) | 1 x 100Gbps | 256 | 129 (1 on the first physical NIC, 128 on the second) |

**Notes**

**1:** Please contact an [Oracle sales representative](https://www.oracle.com/corporate/contact/global.html) for additional details.

### GPU Shapes 🔗

Designed for hardware-accelerated workloads. GPU shapes include Intel, AMD, or Arm CPUs with NVIDIA or AMD graphics processors.
Some bare metal GPU shapes support cluster networking.

These are the bare metal GPU series:

- **BM.GPU2:** X7-based GPU compute.
  - GPU: NVIDIA Tesla P100 16 GB
  - CPU: Intel Xeon Platinum 8167M. Base frequency 2.0 GHz, max turbo frequency 2.4 GHz.
- **BM.GPU3:** X7-based GPU compute.
  - GPU: NVIDIA Tesla V100 16 GB
  - CPU: Intel Xeon Platinum 8167M. Base frequency 2.0 GHz, max turbo frequency 2.4 GHz.
- **BM.GPU4:** E3-based GPU compute.
  - GPU: NVIDIA A100 40 GB
  - CPU: AMD EPYC 7542. Base frequency 2.9 GHz, max boost frequency 3.4 GHz.
- **BM.GPU.A10:** X9-based GPU compute.
  - GPU: NVIDIA A10 24 GB
  - CPU: Intel Xeon Platinum 8358. Base frequency 2.6 GHz, max turbo frequency 3.4 GHz.
- **BM.GPU.A100:** E4-based GPU compute.
  - GPU: NVIDIA A100 80 GB
  - CPU: AMD EPYC 7J13. Base frequency 2.55 GHz, max boost frequency 3.7 GHz.
- **BM.GPU.MI300X.8**: X10-based GPU compute.
  - GPU: 8x MI300X 192 GB
  - CPU: Intel Sapphire Rapids 8480+ 2x 56c. Base frequency 2 GHz, max boost frequency 3.8 GHz.
- **BM.GPU.MI355X.8:** X10-based GPU compute.
  - GPU: 8x MI355X 288 GB
  - CPU: 2 x 64-core AMD 5th Gen AMD EPYC™ Processors
- **BM.GPU.L40S.4**
  - GPU: 4x L40S 48 GB
  - CPU: 2 x 56-core Intel Sapphire Rapids 8480+
- **BM.GPU.H100.8:** X10-based GPU compute.
  - GPU: 8x H100 80 GB
  - CPU: Intel Sapphire Rapids 8480+ 2x 56c. Base frequency 2 GHz, max boost frequency 3.8 GHz.
- **BM.GPU.H200.8**
  - GPU: 8x NVIDIA H200 Tensor Core GPUs 141 GB
  - CPU: 2 x 56-core Intel Sapphire Rapids 8480+
- **BM.GPU.B200.8**
  - GPU: 8x NVIDIA B200 Tensor Core GPUs 180 GB
  - CPU: 2 x 64-core Intel Emerald Rapids 8592+
- **BM.GPU.GB200.4**
  - GPU: 4 x NVIDIA Blackwell B200 192 GB
  - CPU: 2 x 72-core NVIDIA Grace
- **BM.GPU.GB300.4**
  - GPU: 4 x NVIDIA Blackwell B300 278 GB
  - CPU: 2 x 72-core NVIDIA Grace

| Shape | OCPU | GPU Memory (GB) | CPU Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| BM.GPU2.2<br>(GPU: 2xP100) | 28 | 32 | 192 | Block storage only | 2 x 25 Gbps | 28 | 15 (1 on the first physical NIC, 14 on the second) |
| BM.GPU3.8<br>(GPU: 8xV100) | 52 | 128 | 768 | Block storage only | 2 x 25 Gbps | 52 | 27 (1 on the first physical NIC, 26 on the second) |
| BM.GPU4.8<br>(GPU: 8xA100) | 64 | 320 | 2048 | 27.2 TB NVMe SSD (4 drives) | 1 x 50 Gbps<br>8 x 200 Gbps RDMA | 64 | Windows images are not supported on this shape. |
| BM.GPU.A10.4<br>(GPU: 4xA10) | 64 | 96 | 1024 | 7.68 TB NVMe SSD (2 drives) | 2 x 50 Gbps | 256 | Windows images are not supported on this shape. |
| BM.GPU.A100-v2.8<br>(GPU: 8xA100) | 128 | 640 | 2048 | 27.2 TB NVMe SSD (4 drives) | 2 x 50 Gbps<br>16 x 100 Gbps RDMA | 256 | Windows images are not supported on this shape. |
| BM.GPU.MI300X.8 | 112 | 1536 | 2048 | 8 x 3.84 GB NVMe | 1 x 100 Gbps<br>8 x 1 x 400 Gbps RDMA | 256 | Windows images are not supported on this shape. |
| BM.GPU.MI355X.8 | 128 | 288 | 3072 | 8 x 7.68 GB NVMe | 2 x 200 Gbps<br>8 x 400 Gbps RDMA | 256 | Windows images are not supported on this shape. |
| BM.GPU.L40S.4 | 112 | 192 | 1024 | 2 x 3.84 TB NVMe | 1 x 200 Gbps<br>800 Gbps RDMA | 256 | Windows images are not supported on this shape. |
| BM.GPU.H100.8<br>(GPU: 8xH100) | 112 | 640 | 2048 | 16 x 3.84 TB NVMe | 1 x 100 Gbps<br>8 x 2 x 200 Gbps RDMA | 256 | Windows images are not supported on this shape. |
| BM.GPU.H200.8<br>(GPU: 8xH200) | 112 | 1128 | 3072 | 8 x 3.84 TB NVMe | 1 x 200 Gbps<br>8 x 400 Gbps RDMA | 256 | Windows images are not supported on this shape. |
| BM.GPU.B200.8<br>(GPU: 8xB200) | 128 | 1440 | 4096 | 8 x 3.84 TB NVMe | 2 x 200 Gbps<br>8 x 400 Gbps RDMA | 256 | Windows images are not supported on this shape. |
| BM.GPU.GB200.4<br>(GPU: 4xB200) | 144 | 768 | 960 | 4 x 7.68 TB NVMe | 2 x 200 Gbps<br>4 x 400 Gbps RDMA | 512 | Windows images are not supported on this shape. |
| BM.GPU.GB300.4<br>(GPU: 4xB300) | 144 | 1112 | 960 | 4 x 7.68 TB NVMe | 2 x 200 Gbps<br>4 x 800 Gbps RDMA | 512 | Windows images are not supported on this shape. |

### HPC and Optimized Shapes 🔗

Designed for high-performance computing workloads that require high frequency processor cores. Bare metal HPC and optimized shapes support cluster networking.

This is the bare metal optimized series:

- **BM.Optimized3:** Processor: Intel Xeon 6354. Base frequency 3.0 GHz, max turbo frequency 3.6 GHz.
- **BM.HPC.E5:** Processor: AMD EPYC 9J14. Base frequency 2.4 GHz, max boost frequency 3.7 GHz.

| Shape | OCPU | Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| BM.Optimized3.36 | 36 | 512 | 3.84 TB NVMe SSD (1 drive) | 2 X 50 Gbps<br>1 X 100 Gbps RDMA | 256 | 129 |
| BM.HPC.E5.1441 | 144 | 768 | 3.84 TB NVMe SSD (1 drive) | 1 x 100Gbps<br> <br>1 x 100Gbps RDMA | 256 | 129 (1 on the first physical NIC, 128 on the second) |

**Notes**

**1:** Please contact an [Oracle sales representative](https://www.oracle.com/corporate/contact/global.html) for additional details.

## Virtual Machine (VM) Shapes 🔗

The following shapes are available for VMs:

- [Standard Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vm-standard)
- [Dense I/O Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vm-dense)
- [GPU Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vm-gpu)
- [HPC and Optimized Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vm-hpc-optimized)

Network bandwidth is based on expected bandwidth for traffic within a VCN.

### Standard Shapes 🔗

Designed for general purpose workloads and suitable for a wide range of applications and use cases. Standard shapes provide a balance of cores, memory, and network resources. Standard shapes are available with Intel, AMD, and Arm-based processors.

These are the VM standard series:

- **VM.Standard3:** X9-based standard compute. Processor: Intel Xeon Platinum 8358. Base frequency 2.6 GHz, max turbo frequency 3.4 GHz.
- **VM.Standard.E2.1.Micro:** E2-based, E3-based, or E4-based standard compute. Oracle Cloud Infrastructure assigns one of the following processors:
  - AMD EPYC 7551. Base frequency 2.0 GHz, max boost frequency 3.0 GHz.
  - AMD EPYC 7742. Base frequency 2.25 GHz, max boost frequency 3.4 GHz.
  - AMD EPYC 7J13. Base frequency 2.55 GHz, max boost frequency 3.5 GHz.
- **VM.Standard.E4:** E4-based standard compute. Processor: AMD EPYC 7J13. Base frequency 2.55 GHz, max boost frequency 3.5 GHz.
- **VM.Standard.E5:** E5-based standard compute. Processor: AMD EPYC 9J14. Base frequency 2.4 GHz, max boost frequency 3.7 GHz.
- **VM.Standard.E6:** E6-based standard compute. Processor: AMD EPYC 9J45. Base frequency 2.7 GHz, max boost frequency 4.1 GHz.
- **VM.Standard.A1:**
OCI Ampere A1 Compute Arm-based standard compute. Each OCPU corresponds to a single hardware execution thread. Processor: Ampere Altra Q80-30. Max frequency 3.0 GHz.
- **VM.Standard.A2:**
OCI Ampere A2 Compute Arm-based standard compute. Each OCPU corresponds to two hardware execution threads (2 cores). Processor: Ampere AmpereOne A160-30. Max frequency 3.0 GHz.
- **VM.Standard.A4:** OCI Ampere A4 Compute Arm-based standard compute. Each OCPU corresponds to two hardware execution threads (2 cores). Processor: Ampere AmpereOne-M A06-36M. Frequency 3.6 GHz.

| Shape | OCPU | Memory (GB) | Local Disk (TB) | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| VM.Standard3.Flex<br>See [Flexible Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#flexible) and [Burstable Instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/burstable-instances.htm). | 1 minimum, 32 OCPU maximum<br>See [Extended Memory VM Instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/extended-memory-vm-instances.htm "Extended memory virtual machine (VM) instances are VM instances that provide more memory and cores than available with standard shapes."). | 1 GB minimum, 512 GB maximum<br>See [Extended Memory VM Instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/extended-memory-vm-instances.htm "Extended memory virtual machine (VM) instances are VM instances that provide more memory and cores than available with standard shapes."). | Block storage only | 1 Gbps per OCPU, maximum 32 Gbps | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. |
| VM.Standard.E2.1.Micro | 1<br>See [Always Free Resources](https://docs.oracle.com/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm). | 1 | Block storage only | 480 Mbps | 1 | - |
| VM.Standard.E4.Flex<br>See [Flexible Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#flexible) and [Burstable Instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/burstable-instances.htm). | 1 OCPU minimum, 64 OCPU maximum<br>See [Extended Memory VM Instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/extended-memory-vm-instances.htm "Extended memory virtual machine (VM) instances are VM instances that provide more memory and cores than available with standard shapes."). | 1 GB minimum, 1024 GB maximum<br>See [Extended Memory VM Instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/extended-memory-vm-instances.htm "Extended memory virtual machine (VM) instances are VM instances that provide more memory and cores than available with standard shapes."). | Block storage only | 1 Gbps per OCPU, maximum 40 Gbps | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. |
| VM.Standard.E5.Flex<br>See [Flexible Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#flexible). | 1 OCPU minimum, 126 OCPU maximum | 1 GB minimum, 1049 GB maximum | Block storage only | 1 Gbps per OCPU, maximum 40 Gbps | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. |
| VM.Standard.E6.Flex<br>See [Flexible Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#flexible). | 1 OCPU minimum, 126 OCPU maximum | 1 GB minimum, 1454 GB maximum | Block storage only | 1 Gbps per OCPU, maximum 99 Gbps | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. |
| VM.Standard.A1.Flex<br>See [Flexible Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#flexible) and [Arm-Based Compute](https://docs.oracle.com/en-us/iaas/Content/Compute/References/arm.htm "OCI Ampere Compute is a general-purpose, Arm-based compute platform based on the Ampere processor. OCI Ampere A1 Compute (based on Ampere Altra processors) and OCI Ampere A2 Compute (based on AmpereOne processors) instances provide superior price-performance, near linear scaling, built-in security due to the single-threaded core architecture, and a broad developer ecosystem."). | 1 OCPU minimum, 76 OCPU maximum<br>See [Always Free Resources](https://docs.oracle.com/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm). | 1 GB minimum, 472 GB maximum | Block storage only | 1 Gbps per OCPU, maximum 40 Gbps | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. | Windows images are not supported on this shape. |
| VM.Standard.A2.Flex<br>See [Flexible Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#flexible) and [Arm-Based Compute](https://docs.oracle.com/en-us/iaas/Content/Compute/References/arm.htm "OCI Ampere Compute is a general-purpose, Arm-based compute platform based on the Ampere processor. OCI Ampere A1 Compute (based on Ampere Altra processors) and OCI Ampere A2 Compute (based on AmpereOne processors) instances provide superior price-performance, near linear scaling, built-in security due to the single-threaded core architecture, and a broad developer ecosystem."). | 1 OCPU minimum, 78 OCPU maximum | 1 GB minimum, 946 GB maximum | Block storage only | 1 Gbps per OCPU, maximum 78 Gbps | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. | Windows images are not supported on this shape. |
| VM.Standard.A4.Flex<br>See [Flexible Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#flexible) and [Arm-Based Compute](https://docs.oracle.com/en-us/iaas/Content/Compute/References/arm.htm "OCI Ampere Compute is a general-purpose, Arm-based compute platform based on the Ampere processor. OCI Ampere A1 Compute (based on Ampere Altra processors) and OCI Ampere A2 Compute (based on AmpereOne processors) instances provide superior price-performance, near linear scaling, built-in security due to the single-threaded core architecture, and a broad developer ecosystem."). | 1 OCPU minimum, 45 OCPU maximum | 1 GB minimum, 700 GB maximum | Block storage only | 1 Gbps per OCPU, maximum 100 Gbps | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. | Windows images are not supported on this shape. |

### Dense I/O Shapes 🔗

Designed for large databases, big data workloads, and applications that require high-performance local storage. DenseIO shapes include locally-attached NVMe-based SSDs.

This is the VM dense I/O series:

- **VM.DenseIO.E4:** E4-based dense I/O compute. Processor: AMD EPYC 7J13. Base frequency 2.55 GHz, max boost frequency 3.5 GHz.
- **VM.DenseIO.E5:** E5-based dense I/O compute. Processor: AMD EPYC 9J14. Base frequency 2.6 GHz, max boost frequency 3.7 GHz.

| Shape | OCPU | Memory (GB) | Local Disk (TB) | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| VM.DenseIO.E4.Flex<br>See [Flexible Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#flexible). | 8 | 128 | 6.8 TB NVMe SSD storage (1 drive) | 8 Gbps | 8 | 8 |
| 16 | 256 | 13.6 TB NVMe SSD storage (2 drives) | 16 Gbps | 16 | 16 |
| 32 | 512 | 27.2 TB NVMe SSD storage (4 drives) | 32 Gbps | 24 | 24 |
| VM.DenseIO.E5.Flex1 | 8 | 96 | 6.8 TB NVMe SSD storage (1 drive) | 8 Gbps | 8 | 8 |
| 16 | 192 | 13.6 TB NVMe SSD storage (2 drives) | 16 Gbps | 16 | 16 |
| 24 | 288 | 20.4 TB NVMe SSD storage (3 drives) | 24 Gbps | 24 | 24 |
| 32 | 384 | 27.2 TB NVMe SSD storage (4 drives) | 32 Gbps | 24 | 24 |
| 40 | 480 | 34 TB NVMe SSD storage (5 drives) | 40 Gbps | 24 | 24 |
| 48 | 576 | 40.8 TB NVMe SSD storage (6 drives) | 48 Gbps | 24 | 24 |

**Notes**

**1:** Please contact an [Oracle sales representative](https://www.oracle.com/corporate/contact/global.html) for additional details.

### GPU Shapes 🔗

Designed for hardware-accelerated workloads. GPU shapes include Intel, AMD, or Arm CPUs with NVIDIA or AMD graphics processors.

These are the VM GPU series:

- **VM.GPU2:** X7-based GPU compute.
  - GPU: NVIDIA Tesla P100 16 GB
  - CPU: Intel Xeon Platinum 8167M. Base frequency 2.0 GHz, max turbo frequency 2.4 GHz.
- **VM.GPU3:** X7-based GPU compute.
  - GPU: NVIDIA Tesla V100 16 GB
  - CPU: Intel Xeon Platinum 8167M. Base frequency 2.0 GHz, max turbo frequency 2.4 GHz.
- **VM.GPU.A10:** X9-based GPU compute.
  - GPU: NVIDIA A10 24 GB
  - CPU: Intel Xeon Platinum 8358. Base frequency 2.6 GHz, max turbo frequency 3.4 GHz.

| Shape | OCPU | GPU Memory (GB) | CPU Memory (GB) | Local Disk (TB) | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- | --- |
| VM.GPU2.1<br>(GPU: 1xP100) | 12 | 16 | 72 | Block storage only | 8 Gbps | 12 | 12 |
| VM.GPU3.1<br>(GPU: 1xV100) | 6 | 16 | 90 | Block storage only | 4 Gbps | 6 | 6 |
| VM.GPU3.2<br>(GPU: 2xV100) | 12 | 32 | 180 | Block storage only | 8 Gbps | 12 | 12 |
| VM.GPU3.4<br>(GPU: 4xV100) | 24 | 64 | 360 | Block storage only | 24.6 Gbps | 24 | 24 |
| VM.GPU.A10.1<br>(GPU: 1xA10) | 15 | 24 | 240 | Block storage only | 24 Gbps | 15 | 15 |
| VM.GPU.A10.2<br>(GPU: 2xA10) | 30 | 48 | 480 | Block storage only | 48 Gbps | 24 | 24 |

### HPC and Optimized Shapes 🔗

Designed for high-performance computing workloads that require high frequency processor cores.

This is the VM optimized series:

- **VM.Optimized3:** Processor: Intel Xeon 6354. Base frequency 3.0 GHz, max turbo frequency 3.6 GHz.

| Shape | OCPU | Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| VM.Optimized3.Flex | 1 OCPU minimum, 18 OCPU maximum | 1 GB minimum, 256 GB maximum | Block storage only | 4 Gbps per OCPU, maximum 40 Gbps | 2 VNICs per OCPU.<br>Maximum 24 VNICs. | 2 VNICs per OCPU.<br>Maximum 24 VNICs. |

## Dedicated Virtual Machine Host Shapes 🔗

| Shape | Instance Type | Billed OCPU | Usable OCPU1 | Total Memory (GB)3 | Usable Memory (GB)1 | Supported Shapes for Hosted VMs |
| --- | --- | --- | --- | --- | --- | --- |
| DVH.Standard2.522 | X7-based VM host | 52 | 48 | 768 | 736 | VM.Standard2 series |
| DVH.Standard3.64 | X9-based VM host | 64 | 60 | 1024 | 960 | VM.Standard3 series |
| DVH.Standard.E2.642 | E2-based VM host | 64 | 59 | 512 | 480 | VM.Standard.E2 series |
| DVH.Standard.E3.1282 | E3-based VM host | 128 | 124 | 2048 | 1912 | VM.Standard.E3 series |
| DVH.Standard.E4.128 | E4-based VM host | 128 | 124 | 2048 | 1912 | VM.Standard.E4 series |
| DVH.Standard.E5.192 | E5-based VM host | 192 | 188 | 2304 | 2098 | VM.Standard.E5 series |
| DVH.DenseIO2.522 | X7-based dense I/O VM host | 52 | 48 | 768 | 736 | VM.DenseIO2 series |
| DVH.Optimized3.36 | X9-based optimized VM host | 36 | 34 | 512 | 472 | VM.Optimized3 series |

**Notes**

**1:** The difference between total and usable OCPUs and memory is caused by the need to reserve OCPUs and memory for hypervisor use.

**2:** Because this dedicated virtual machine host shape supports hosted VMs that use a [previous generation](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#previous-generation-shapes) shape series, it is available by request only.

**3:** For Standard2, Standard.E2, and DenseIO2 shapes, billing is based on OCPUs, not memory. For all other shapes that support flexible hosted VMs, billing is based on OCPUs and memory, which are billed independently.

## Previous Generation Shapes 🔗

**Tip**

Previous generation shapes are still fully supported. However, because the underlying hardware has reached the sustaining phase of its lifecycle, capacity in certain high-demand regions might be limited.

Oracle Cloud Infrastructure periodically releases new generations of Compute shapes. The latest shapes let you take advantage of newer hardware and a better price-performance ratio. When a shape is several years old, and newer generation shapes that are suited for the same purposes are available, the old shape transitions to become a previous generation shape.

Your current utilization is fully supported on the previous generation shape. In certain high demand regions, you may need to plan your utilization growth on a newer generation shape.

### Upgrading from a Previous Generation Shape 🔗

To upgrade from a previous generation shape to a current generation shape, you can do the following things:

- For supported VM instances, [change the shape of the instance](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/resizinginstances.htm).
- For bare metal instances and VM instances that don't support changing the shape, [terminate the instance but DO NOT delete the boot volume](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/terminatinginstance.htm "You can permanently delete (terminate) instances that you no longer need. Any attached VNICs and volumes are automatically detached when the instance terminates. Eventually, the instance's public and private IP addresses are released and become available for other instances."). Then, [use the boot volume to create a new instance](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/launchinginstance.htm "Create a bare metal or virtual machine (VM) compute instance.").

### Previous Generation Bare Metal Shapes 🔗

These are the previous generation bare metal shape series.

[BM.Standard1](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** BM.Standard3.64, BM.Standard.E4.128, or BM.Standard.A1.160

**End of orderability date:** December 31, 2020

X5-based standard compute. Processor: Intel Xeon E5-2699 v3. Base frequency 2.3 GHz, max turbo frequency 3.6 GHz.

| Shape | OCPU | Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| BM.Standard1.36 | 36 | 256 | Block storage only | 1 x 10 Gbps | 100 | 1 |

[BM.Standard.B1](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** BM.Standard3.64, BM.Standard.E4.128, or BM.Standard.A1.160

**End of orderability date:** December 31, 2020

X6-based standard compute. Processor: Intel Xeon E5-2699 v4. Base frequency 2.2 GHz, max turbo frequency 3.6 GHz.

| Shape | OCPU | Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| BM.Standard.B1.44 | 44 | 512 | Block storage only | 1 x 25 Gbps | 44 | None |

[BM.Standard2](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** BM.Standard3.64, BM.Standard.E4.128, or BM.Standard.A1.160

**End of orderability date:** February 28, 2022

X7-based standard compute. Processor: Intel Xeon Platinum 8167M. Base frequency 2.0 GHz, max turbo frequency 2.4 GHz.

| Shape | OCPU | Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| BM.Standard2.52 | 52 | 768 | Block storage only | 2 x 25 Gbps | 200 | 101 total (1 on the first physical NIC, 100 on the second) |

[BM.Standard.E2](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** BM.Standard3.64, BM.Standard.E4.128, or BM.Standard.A1.160

**End of orderability date:** February 8, 2021

E2-based standard compute. Processor: AMD EPYC 7551. Base frequency 2.0 GHz, max boost frequency 3.0 GHz.

| Shape | OCPU | Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| BM.Standard.E2.64 | 64 | 512 | Block storage only | 2 x 25 Gbps | 150 | 76 (1 on the first physical NIC, 75 on the second) |

[BM.Standard.E3](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** BM.Standard.E4.128, BM.Standard3.64, or BM.Standard.A1.160

**End of orderability date:** March 31, 2022

E3-based standard compute. Processor: AMD EPYC 7742. Base frequency 2.25 GHz, max boost frequency 3.4 GHz.

| Shape | OCPU | Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| BM.Standard.E3.128 | 128 | 2048 | Block storage only | 2 x 50 Gbps | 256 | 129 (1 on the first physical NIC, 128 on the second) |

[BM.DenseIO1](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** BM.DenseIO.E4

**End of orderability date:** December 31, 2020

X5-based dense I/O compute. Processor: Intel Xeon E5-2699 v3. Base frequency 2.3 GHz, max turbo frequency 3.6 GHz.

| Shape | OCPU | Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| BM.DenseIO1.36 | 36 | 512 | 28.8 TB NVMe SSD (9 drives) | 1 x 10 Gbps | 36 | 1 |

[BM.DenseIO2](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** BM.DenseIO.E4

**End of orderability date:** April 14, 2022

X7-based dense I/O compute. Processor: Intel Xeon Platinum 8167M. Base frequency 2.0 GHz, max turbo frequency 2.4 GHz.

| Shape | OCPU | Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| BM.DenseIO2.52 | 52 | 768 | 51.2 TB NVMe SSD (8 drives) | 2 x 25 Gbps | 52 total (26 per physical NIC) | 27 total (1 on the first physical NIC, 26 on the second) |

[BM.HPC2](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** BM.Optimized3.36

**End of orderability date:** February 28, 2022

X7-based high frequency compute. Processor: Intel Xeon Gold 6154. Base frequency 3.0 GHz, max turbo frequency 3.7 GHz.

| Shape | OCPU | Memory (GB) | Local Disk | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| BM.HPC2.36 | 36 | 384 | 6.4 TB NVMe SSD (1 drive) | 1 x 25 Gbps<br>1 x 100 Gbps RDMA | 50 | 1 |

### Previous Generation VM Shapes 🔗

These are the previous generation VM shape series.

[VM.Standard1](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** VM.Standard3.Flex, VM.Standard.E4.Flex, or VM.Standard.A1.Flex

**End of orderability date:** December 31, 2020

X5-based standard compute. Processor: Intel Xeon E5-2699 v3. Base frequency 2.3 GHz, max turbo frequency 3.6 GHz.

| Shape | OCPU | Memory (GB) | Local Disk (TB) | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| VM.Standard1.1 | 1 | 7 | Block storage only | 600 Mbps | 2 | 1 |
| VM.Standard1.2 | 2 | 14 | Block storage only | 1.2 Gbps | 2 | 1 |
| VM.Standard1.4 | 4 | 28 | Block storage only | 1.2 Gbps | 4 | 1 |
| VM.Standard1.8 | 8 | 56 | Block storage only | 2.4 Gbps | 8 | 1 |
| VM.Standard1.16 | 16 | 112 | Block storage only | 4.8 Gbps | 16 | 1 |

[VM.Standard.B1](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** VM.Standard3.Flex, VM.Standard.E4.Flex, or VM.Standard.A1.Flex

**End of orderability date:** December 31, 2020

X6-based standard compute. Processor: Intel Xeon E5-2699 v4. Base frequency 2.2 GHz, max turbo frequency 3.6 GHz.

| Shape | OCPU | Memory (GB) | Local Disk (TB) | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| VM.Standard.B1.1 | 1 | 12 | Block storage only | 600 Mbps | 2 | 2 |
| VM.Standard.B1.2 | 2 | 24 | Block storage only | 1.2 Gbps | 2 | 2 |
| VM.Standard.B1.4 | 4 | 48 | Block storage only | 2.4 Gbps | 4 | 4 |
| VM.Standard.B1.8 | 8 | 96 | Block storage only | 4.8 Gbps | 8 | 8 |
| VM.Standard.B1.16 | 16 | 192 | Block storage only | 9.6 Gbps | 16 | 16 |

[VM.Standard2](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** VM.Standard3.Flex, VM.Standard.E4.Flex, or VM.Standard.A1.Flex

**End of orderability date:** February 28, 2022

X7-based standard compute. Processor: Intel Xeon Platinum 8167M. Base frequency 2.0 GHz, max turbo frequency 2.4 GHz.

| Shape | OCPU | Memory (GB) | Local Disk (TB) | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| VM.Standard2.1 | 1 | 15 | Block storage only | 1 Gbps | 2 | 2 |
| VM.Standard2.2 | 2 | 30 | Block storage only | 2 Gbps | 2 | 2 |
| VM.Standard2.4 | 4 | 60 | Block storage only | 4.1 Gbps | 4 | 4 |
| VM.Standard2.8 | 8 | 120 | Block storage only | 8.2 Gbps | 8 | 8 |
| VM.Standard2.16 | 16 | 240 | Block storage only | 16.4 Gbps | 16 | 16 |
| VM.Standard2.24 | 24 | 320 | Block storage only | 24.6 Gbps | 24 | 24 |

[VM.Standard.E2](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** VM.Standard3.Flex, VM.Standard.E4.Flex, or VM.Standard.A1.Flex

**End of orderability date:** February 8, 2021

E2-based standard compute. Processor: AMD EPYC 7551. Base frequency 2.0 GHz, max boost frequency 3.0 GHz.

| Shape | OCPU | Memory (GB) | Local Disk (TB) | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| VM.Standard.E2.1 | 1 | 8 | Block storage only | 700 Mbps | 2 | 2 |
| VM.Standard.E2.2 | 2 | 16 | Block storage only | 1.4 Gbps | 2 | 2 |
| VM.Standard.E2.4 | 4 | 32 | Block storage only | 2.8 Gbps | 4 | 4 |
| VM.Standard.E2.8 | 8 | 64 | Block storage only | 5.6 Gbps | 4 | 4 |

[VM.Standard.E3](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** VM.Standard.E4.Flex, VM.Standard3.Flex, or VM.Standard.A1.Flex

**End of orderability date:** March 31, 2022

E3-based standard compute, with a flexible number of OCPUs. Processor: AMD EPYC 7742. Base frequency 2.25 GHz, max boost frequency 3.4 GHz.

| Shape | OCPU | Memory (GB) | Local Disk (TB) | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| VM.Standard.E3.Flex<br>See [Flexible Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#flexible) and [Burstable Instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/burstable-instances.htm). | 1 OCPU minimum, 64 OCPU maximum | 1 GB minimum, 1024 GB maximum | Block storage only | 1 Gbps per OCPU, maximum 40 Gbps | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. | VM with 1 OCPU: 2 VNICs.<br>VM with 2 or more OCPUs: 1 VNIC per OCPU.<br>Maximum 24 VNICs. |

[VM.DenseIO1](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** VM.DenseIO.E4 series

**End of orderability date:** December 31, 2020

X5-based dense I/O compute. Processor: Intel Xeon E5-2699 v3. Base frequency 2.3 GHz, max turbo frequency 3.6 GHz.

| Shape | OCPU | Memory (GB) | Local Disk (TB) | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| VM.DenseIO1.4 | 4 | 60 | 3.2 TB NVMe SSD | 1.2 Gbps | 4 | 1 |
| VM.DenseIO1.8 | 8 | 120 | 6.4 TB NVMe SSD | 2.4 Gbps | 8 | 1 |
| VM.DenseIO1.16 | 16 | 240 | 12.8 TB NVMe SSD | 4.8 Gbps | 16 | 1 |

[VM.DenseIO2](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#)

**Newer shape recommendation:** VM.DenseIO.E4 series

**End of orderability date:** April 28, 2022

X7-based dense I/O compute. Processor: Intel Xeon Platinum 8167M. Base frequency 2.0 GHz, max turbo frequency 2.4 GHz.

| Shape | OCPU | Memory (GB) | Local Disk (TB) | Max Network Bandwidth | Max VNICs Total: Linux | Max VNICs Total: Windows |
| --- | --- | --- | --- | --- | --- | --- |
| VM.DenseIO2.8 | 8 | 120 | 6.4 TB NVMe SSD | 8.2 Gbps | 8 | 8 |
| VM.DenseIO2.16 | 16 | 240 | 12.8 TB NVMe SSD | 16.4 Gbps | 16 | 16 |
| VM.DenseIO2.24 | 24 | 320 | 25.6 TB NVMe SSD | 24.6 Gbps | 24 | 24 |

Was this article helpful?

YesNo

- Expand All Expandable Areas

- [Compute Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#Compute_Shapes)
- [Compute Shape Pricing](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#Compute_Shapes__pricing)
- [Flexible Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#flexible)
- [Supported Images](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#images)
- [Supported Regions](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#regions)
- [Extended Memory VM Instances](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#computeshapes_topic-extended-memory)
- [Bare Metal Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#baremetalshapes)
- [Standard Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#bm-standard)
- [Dense I/O Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#bm-dense)
- [GPU Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#bm-gpu)
- [HPC and Optimized Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#bm-hpc-optimized)
- [Virtual Machine (VM) Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vmshapes)
- [Standard Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vm-standard)
- [Dense I/O Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vm-dense)
- [GPU Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vm-gpu)
- [HPC and Optimized Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#vm-hpc-optimized)
- [Dedicated Virtual Machine Host Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#dedicatedvmhost)
- [Previous Generation Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#previous-generation-shapes)
- [Upgrading from a Previous Generation Shape](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#previous-generation-shapes__upgrading-from-previous-generation)
- [Previous Generation Bare Metal Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#previous-generation-shapes__previous-generation-bm)
- [Previous Generation VM Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm#previous-generation-shapes__previous-generation-vm)

Was this article helpful?

YesNo

