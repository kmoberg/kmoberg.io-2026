---
title: "How you can try out new technology in the cloud - for FREE!"
date: 2021-09-06
tags: ["posts","IT","AWS","Homelab","Programming","Lab"]
permalink: /how-you-can-try-out-new-technology-in-the-cloud-for-free/
---
<h2 id="background">Background</h2>
<p>In IT, we do a lot of “lab” work. Trying new things, testing out a theory or an application that you have developed, or simply learning a new technology, such as Linux or Windows server.</p>
<p>This labbing can, of course, be done in a multitude of ways. On your computer, on an old server or even a Raspberry Pi! All of these methods work very well, however, they all have some downsides: your computer might run slowly because you’re running a virtual machine on top of your ordinary OS. Old servers consume a lot of power (and noise), and a Raspberry Pi might not support the software you want to run, or might not be powerful enough for your task. On top of all of that, a home server or Raspberry Pi might not be available to you from outside of home without configuring VPNs which adds extra complexity.</p>
<p>There is however, a simple way to allow you to run your lab, from anywhere, for <strong>free*</strong> - in the cloud, using Amazon Web Services. AWS is the worlds largest public cloud provider, and according to [Forbes (2019)] it accounts for nearly <em>half</em> of the worlds public cloud revenue with almost every Forbes top 100 companies using AWS for some of their digital needs.</p>
<p>Ok, I hear you say, how does this benefit you and your lab? Well - Amazon offers one of the most generous free-tier offers for its new users out of all the large public cloud providers - a full <strong>year</strong> of free services! And if you know the limitations of the free tier, you can run clusters of virtual machines at a time if you want to try out auto-scaling instances, a platitude of databases, or want to crunch a dataset or two a month. Or, maybe you just want to host a website? You can do that too, for free, for a full year!</p>
<blockquote>
<p>** = AWS offers a specific “free tier” of products for 12 months for new accounts with set limitations to usage per month. This does not include all products, but is limited to specific ones. We <strong>strongly</strong> recommend you configure a billing alert to warn you if any cost accumulate on your account. Refer to this post #FIXME to see how you can configure this sort of alert.</p>
</blockquote>
<h2 id="the-aws-free-tier">The AWS Free Tier</h2>
<p>Amazon Web Services (AWS) has one of the most generous free tiers of the major public cloud providers. It offers a mix of over 100 <strong>always free</strong> and <strong>12 months free</strong> products that you can use to your hearts content to lab out your new applications and it is important that you understand how the free tier works, if you want to avoid being charged for your AWS usage.</p>
<h3 id="product-naming">Product Naming</h3>
<p>If you have never used AWS before, there are some common names you need to be aware of before we get started. And yes - AWS naming of products can be... Hard to understand. If you already have experience with AWS, you can skip this section. (Note: If you already have experience with AWS, you can skip this section.)</p>
<p><strong>Amazon EC2</strong> is the AWS Virtual Machine service. Ever created a virtual machine in VMware, Hyper-V or Azure? This is the same thing. An “EC2 Instance” refers to a virtual machine. Oh, and since it’s called EC<strong>2</strong>, you might think there was an EC1 at some point? Nope. EC2 stands for Elastic Compute Cloud = EC2.</p>
<p><strong>Amazon S3</strong> is for <strong>object</strong> storage. What does object storage mean?  In S3, you can store images (I use it to store and serve all my screenshots out of), documents, config files, text files, you name it. If it is an object, you can store it here. However, keep in mind, it is NOT a file system! So what happened to S1, and S2 you might say? Again, never existed. 🤦‍♂️ S3 = Simple Storage Service.</p>
<p><strong>AWS Lambda</strong> a serverless compute service. Ever wanted to write a function or an API without worrying how to run it? Write a lambda function! The code can be triggered multiple ways, and will run, without you ever configuring a server!</p>
<p><strong>Amazon RDS</strong>, AWS managed Relational database service! Not only does it save you from having to become a Windows or Linux server guru just to get a simple database running, it might also even be cheaper with out the overhead of having to have an operating system as well. It also out of the box supports scaling, high availability, and can be much more secure than you having to become a leet hacker yourself.</p>
<p><strong>DynamoDB</strong> SQL not your thing? DynamoDB is for you then! A NoSQL database with MongoDB support! If you ask MongoDB, they’ll say that their cloud offering is much better than DynamoDB, and you can’t compare the two, but from experience... DynamoDB is pretty good for 9 out of 10 use cases!</p>
<p><strong>VPC</strong>, Virtual Private Cloud. A VPC allows you to segment your resources into multiple networks, completely segmented from each other. Think of this, kinda like a VLAN, except it’s not a VLAN. Confusing, I know, but you don’t need to worry too much about it for now.</p>
<p>And that’s only barely touching the surface of AWS products. As of writing, in September 2021, there are over 200 AWS services, with more being added almost monthly. In 2020, a fantastic [YouTube Video] was made of every AWS product. The week after it was made, another 10 services were launched.</p>
<h3 id="free-tier-offers">Free Tier Offers</h3>
<p>For the most up to date, and complete list of current free tier offers, make sure to check out Amazons own page on the different products. Keep in mind that although this article does list a few, very long running and most common free tier offers, they may change at Amazons discretion, so make sure to double check [<a href="https://aws.amazon.com/free/">https://aws.amazon.com/free/</a>] for the up to date info.</p>
<p><strong>Amazon EC2</strong>: t2/t3.micro - 750 hours/month for 12 months.<br>
AWS offers you 750 hours per month, for 12 months. You can chose to spend these 750 hours however you like, if you want to run 10 instances for 75 hours, or 75 instances for 10 hours, you can do so, or you can run 1 instance for an entire month, 24/7. This offer is limited to the t3.micro instance, which is equivalent to 2 vCPUs and 1GB RAM. Before you think that this is not enough: A single t3.micro instance, can easily serve a hundred thousand monthly web users, if configured well and using managed RDS.</p>
<p><strong>Amazon RDS</strong>: t3.micro - 750 hours/month for 12 months.<br>
Same deal as with EC2, you can run a single DB server 24/7 for a month or 75 instances for 10 hours. Combined with an EC2 web server, this combination is very powerful.</p>
<p><strong>AWS Lambda</strong>: 1 million free requests/month, always free!<br>
Pretty self explanatory! 1 million requests a month for free! Always!</p>
<p><strong>Amazon S3</strong> 5 GB storage for 12 months.<br>
You get 5 GB of object storage for free, however, one metric to keep in mind here is that you do get a limited number of GET and PUT requests: **20,000 GET **requests, <strong>2,000 PUT</strong> requests.</p>
<p>Again, there are over 100 products available on the free tier, so make sure to check out Amazons page to see details on each subject.</p>
<h2 id="before-we-get-started">Before We Get Started</h2>
<p>With an understanding of how the free tier works, it’s now time to get started with some labbing!</p>
<p>There are two ways to follow along with the labs in this article:</p>
<ol>
<li>
<p>Follow along in the AWS Console, and click the appropriate buttons to complete the configuration.</p>
</li>
<li>
<p>Use the AWS CLI for your operating system. Everything you can do in the AWS Console, you can do with the AWS CLI from your computer. Learning the AWS CLI can be very useful and allows for scripting of commands and automatically building and tearing down configurations once you are done.</p>
</li>
</ol>
<blockquote>
<p>There is nothing wrong with either alternatives, and they are both perfectly legitimate ways of interacting with AWS. In fact, most people work with a combination of both tools depending on what task they are doing. However: We do recommend that you configure your AWS CLI and try it out, even if you want to primarily use the web console, as there are some things, like CloudFormation that require that you use the CLI.</p>
</blockquote>
<h3 id="terraform">Terraform</h3>
<p>Finally, there is one more way to do all configuration, which I will touch on in a separate article, as it is another huge project in and of it self - <strong>Terraform</strong>. Terraform is an <strong>Infrastructure as Code (IAC)</strong> tool, a declarative programming language that allows you to tell the code what you want it to look like, then it will do the work for you. You can tell it to start a specific instance, with X storage and Y RAM etc. and it will do it for you. It will also allow you to destroy everything, with a single command line command. <strong>THIS</strong> is what makes labbing in the cloud extremely easy. Watch out for part two of this article series for that!</p>
<h2 id="let%E2%80%99s-get-labbing">Let’s get labbing!</h2>
<p>In the first drafts of this blog, I had a step-by-step guide included directly in the post, but it very quickly becomes very overwhelming in a post, so as a result, I'm going to link to the same workshop over on GitHub: <a href="https://github.com/Bergen-Cloud-User-Group/01-Introduction-To-Cloud-Computing/tree/master/Workshop/01%20-%20Stage%201">https://github.com/Bergen-Cloud-User-Group/01-Introduction-To-Cloud-Computing/tree/master/Workshop/01 - Stage 1</a></p>
<p>I recommend you try it out over on GitHub, as it is a great and fun exercise to try out! Good ouck!</p>

