// https://www.pricerunner.com/cl/72/Toys?attr_57121593=57121615&attr_57121617=60430082&sort=price_asc

const d = [...document.querySelectorAll('.k6oEmfY83J')].map(p => p.textContent).filter(t => t.includes('Pieces')).map(e => { return { e, no: parseInt(e.split('Pieces')[0].split(' ').filter(t => t !== '').reverse()[0]), p: parseFloat(parseFloat(e.split('£')[1]).toFixed(2)) } }).map(a => { return { t: a.e.split('Lego Technic')[1].trim(), no: a.no, p: a.p, e: a.p / a.no } }).sort((a, b) => a.e - b.e).map(e => JSON.stringify(e))

const f = [
  {
    t: 'McLaren Senna GTR 42123',
    no: 830,
    p: 33.99,
    e: 0.040951807228915664
  },
  {
    t: 'Catamaran 42105',
    no: 404,
    p: 18,
    e: 0.04455445544554455
  },
  {
    t: 'Jeep Wrangler 42122',
    no: 665,
    p: 30,
    e: 0.045112781954887216
  },
  {
    t: 'The Batman Batmobile 42127',
    no: 1360,
    p: 63,
    e: 0.04632352941176471
  },
  {
    t: 'Car Transporter 42098',
    no: 2493,
    p: 119.95,
    e: 0.04811472121941436
  },
  {
    t: 'Rescue Hovercraft 42120',
    no: 457,
    p: 22.95,
    e: 0.05021881838074398
  },
  {
    t: 'Ford F 150 Raptor 42126',
    no: 1379,
    p: 69.99,
    e: 0.050754169688179834
  },
  {
    t: 'Land Rover Defender 42110',
    no: 2573,
    p: 135,
    e: 0.05246793626117373
  },
  {
    t: 'Monster Jam Megalodon 42134',
    no: 260,
    p: 13.99,
    e: 0.053807692307692306
  },
  {
    t: 'Motorcycle 42132',
    no: 163,
    p: 8.99,
    e: 0.055153374233128834
  },
  {
    t: 'Race Plane 42117',
    no: 154,
    p: 8.5,
    e: 0.05519480519480519
  },
  {
    t: 'Heavy-Duty Excavator 42121',
    no: 569,
    p: 31.95,
    e: 0.05615114235500879
  },
  {
    t: 'Monster Jam™ El Toro Loco™ 42135',
    no: 247,
    p: 14.4,
    e: 0.058299595141700404
  },
  {
    t: 'Monster Jam Max-D 42119',
    no: 230,
    p: 13.5,
    e: 0.058695652173913045
  },
  {
    t: 'Stunt Show Truck & Bike 42106',
    no: 610,
    p: 35.99,
    e: 0.059000000000000004
  },
  {
    t: 'Heavy Tow Truck 42128',
    no: 2017,
    p: 119.99,
    e: 0.0594893406048587
  },
  {
    t: 'Mobile Crane 42108',
    no: 1292,
    p: 79.95,
    e: 0.061880804953560374
  },
  {
    t: 'Telehandler 42133',
    no: 143,
    p: 8.99,
    e: 0.06286713286713287
  },
  {
    t: 'Ferrari 488 GTE AF Corse #51 42125',
    no: 1682,
    p: 106,
    e: 0.06302021403091558
  },
  {
    t: 'Monster Jam Grave Digger 42118',
    no: 212,
    p: 13.45,
    e: 0.0634433962264151
  },
  {
    t: 'John Deere 9620R 4WD Tractor 42136',
    no: 390,
    p: 24.99,
    e: 0.06407692307692307
  },
  {
    t: 'Rough Terrain Crane 42082',
    no: 4057,
    p: 265.76,
    e: 0.06550653192013803
  },
  {
    t: 'Ford Mustang Shelby GT500 42138',
    no: 544,
    p: 35.99,
    e: 0.06615808823529412
  },
  {
    t: 'Airbus H175 Rescue Helicopter 42145',
    no: 2001,
    p: 134.99,
    e: 0.06746126936531735
  },
  {
    t: "Dom's Dodge Charger 42111",
    no: 1077,
    p: 73.75,
    e: 0.06847725162488394
  },
  {
    t: 'Mini Claas Xerion 42102',
    no: 130,
    p: 9.01,
    e: 0.0693076923076923
  },
  {
    t: 'Porsche 911 RSR 42096',
    no: 1580,
    p: 109.99,
    e: 0.06961392405063291
  },
  {
    t: 'Lamborghini Sian FKP 37 42115',
    no: 3696,
    p: 257.95,
    e: 0.06979166666666667
  },
  {
    t: 'All Terrain Vehicle 42139',
    no: 764,
    p: 53.99,
    e: 0.0706675392670157
  },
  {
    t: 'Chevrolet Corvette ZR1 42093',
    no: 579,
    p: 42.98,
    e: 0.0742314335060449
  },
  {
    t: 'Ducati Panigale V4 R 42107',
    no: 646,
    p: 48.75,
    e: 0.07546439628482972
  },
  {
    t: 'Monster Truck 42005',
    no: 329,
    p: 25,
    e: 0.07598784194528875
  },
  {
    t: 'Concrete Mixer Truck 42112',
    no: 1163,
    p: 89.99,
    e: 0.0773774720550301
  },
  {
    t: 'Ferrari Daytona SP3 42143',
    no: 3778,
    p: 294.99,
    e: 0.07808099523557438
  },
  {
    t: 'Formula E Porsche 99X Electric 42137',
    no: 422,
    p: 33.49,
    e: 0.07936018957345972
  },
  {
    t: 'Mercedes-Benz Zetros Trial Truck 42129',
    no: 2110,
    p: 168.32,
    e: 0.07977251184834123
  },
  {
    t: 'Dragster 42103',
    no: 225,
    p: 17.99,
    e: 0.07995555555555554
  },
  {
    t: 'Hovercraft 42076',
    no: 1020,
    p: 82.99,
    e: 0.08136274509803922
  },
  {
    t: 'BMW M 1000 RR 42130',
    no: 1920,
    p: 159,
    e: 0.0828125
  },
  {
    t: 'App Controlled D11 Bulldozer 42131',
    no: 3854,
    p: 319.99,
    e: 0.08302802283341983
  },
  {
    t: 'McLaren Formula 1 42141',
    no: 1432,
    p: 118.99,
    e: 0.08309357541899441
  },
  {
    t: 'Extreme Adventure 42069',
    no: 2382,
    p: 199.95,
    e: 0.08394206549118387
  },
  {
    t: 'Mine Loader 42049',
    no: 476,
    p: 40.95,
    e: 0.08602941176470588
  },
  {
    t: 'Volvo 6x6 Articulated Truck 42114',
    no: 2193,
    p: 194.36,
    e: 0.08862745098039217
  },
  {
    t: 'Bugatti Chiron 42083',
    no: 3599,
    p: 319.99,
    e: 0.08891080855793276
  },
  {
    t: 'Material Handler 42144',
    no: 835,
    p: 76.99,
    e: 0.09220359281437125
  },
  {
    t: 'Volvo Concept Wheel Loader ZEUX 42081',
    no: 1167,
    p: 114.99,
    e: 0.09853470437017994
  },
  {
    t: 'Volvo Wheel Loader 30433',
    no: 69,
    p: 6.99,
    e: 0.10130434782608697
  },
  {
    t: 'Hook Loader 42084',
    no: 176,
    p: 19.95,
    e: 0.11335227272727272
  },
  {
    t: 'First Responder 42075',
    no: 513,
    p: 59.05,
    e: 0.11510721247563352
  },
  {
    t: 'App Controlled Transformation Vehicle 42140',
    no: 772,
    p: 90,
    e: 0.11658031088082901
  },
  {
    t: 'Rally Car 42077',
    no: 1005,
    p: 117.95,
    e: 0.11736318407960199
  },
  {
    t: 'Race Truck 42104',
    no: 227,
    p: 27.95,
    e: 0.12312775330396475
  },
  {
    t: 'Helicopter 30465',
    no: 70,
    p: 8.82,
    e: 0.126
  },
  {
    t: 'Compact Crawler Crane 42097',
    no: 920,
    p: 119.9,
    e: 0.13032608695652176
  },
  {
    t: 'Rescue Helicopter 42092',
    no: 325,
    p: 42.43,
    e: 0.13055384615384616
  },
  {
    t: 'Mack Anthem 42078',
    no: 2595,
    p: 339.99,
    e: 0.13101734104046242
  },
  {
    t: 'Getaway Truck 42090',
    no: 128,
    p: 18,
    e: 0.140625
  },
  {
    t: 'Volvo EW160E 42053',
    no: 1166,
    p: 172.99,
    e: 0.14836192109777016
  },
  {
    t: 'Forest Machine 42080',
    no: 1003,
    p: 148.99,
    e: 0.14854436689930212
  },
  {
    t: 'Cherry Picker 42088',
    no: 155,
    p: 23.77,
    e: 0.15335483870967742
  },
  {
    t: 'Liebherr R 9800 Excavator 42100',
    no: 4108,
    p: 649,
    e: 0.1579844206426485
  },
  {
    t: '6x6 All Terrain Tow Truck 42070',
    no: 1862,
    p: 294.99,
    e: 0.15842642320085928
  },
  {
    t: 'Arctic Truck 42038',
    no: 913,
    p: 144.99,
    e: 0.15880613362541074
  },
  {
    t: 'Heavy Duty Forklift 42079',
    no: 592,
    p: 94.5,
    e: 0.15962837837837837
  },
  {
    t: 'Tracked Loader 42094',
    no: 827,
    p: 139.77,
    e: 0.16900846432889965
  },
  {
    t: 'Buggy 42101',
    no: 117,
    p: 20.39,
    e: 0.17427350427350427
  },
  {
    t: 'Mobile Crane MK II 42009',
    no: 2606,
    p: 475,
    e: 0.1822716807367613
  },
  {
    t: 'Mercedes-Benz Arocs 3245 42043',
    no: 2793,
    p: 520,
    e: 0.1861797350519155
  },
  {
    t: 'Customized Pick up Truck 42029',
    no: 1063,
    p: 199.99,
    e: 0.188137347130762
  },
  {
    t: 'Hot Rod 42022',
    no: 414,
    p: 83.08,
    e: 0.20067632850241546
  },
  {
    t: 'Remote Controlled Stunt Racer 42095',
    no: 324,
    p: 70,
    e: 0.21604938271604937
  },
  {
    t: 'Formula Off-Roader 42037',
    no: 494,
    p: 106.96,
    e: 0.21651821862348178
  },
  {
    t: 'Off-Road Buggy 42124',
    no: 374,
    p: 84.95,
    e: 0.22713903743315508
  },
  {
    t: 'Bucket Wheel Excavator 42055',
    no: 3929,
    p: 901.5,
    e: 0.22944769661491474
  },
  {
    t: 'Drag Racer 42050',
    no: 647,
    p: 149.99,
    e: 0.23182380216383308
  },
  {
    t: 'BMW R 1200 GS Adventure 42063',
    no: 603,
    p: 142.5,
    e: 0.236318407960199
  },
  {
    t: '4x4 X Treme Off Roader 42099',
    no: 958,
    p: 229.99,
    e: 0.2400730688935282
  },
  {
    t: 'Police Interceptor 42047',
    no: 185,
    p: 45.36,
    e: 0.2451891891891892
  },
  {
    t: 'Snowmobile 42021',
    no: 186,
    p: 47.14,
    e: 0.25344086021505374
  },
  {
    t: 'Container Truck 42024',
    no: 948,
    p: 244,
    e: 0.25738396624472576
  },
  {
    t: 'App Controlled Top Gear Rally Car 42109',
    no: 463,
    p: 119.95,
    e: 0.25907127429805615
  },
  {
    t: 'Record Breaker 42033',
    no: 125,
    p: 32.9,
    e: 0.2632
  },
  {
    t: 'Hydroplane Racer 42045',
    no: 180,
    p: 48.99,
    e: 0.27216666666666667
  },
  {
    t: 'Remote Controlled Volvo L350F Wheel Loader 42030',
    no: 1636,
    p: 448.99,
    e: 0.2744437652811736
  },
  {
    t: 'Excavator 42006',
    no: 720,
    p: 200,
    e: 0.2777777777777778
  },
  {
    t: 'Stunt Bike 42058',
    no: 140,
    p: 39.79,
    e: 0.2842142857142857
  },
  {
    t: 'Power Boat 42089',
    no: 174,
    p: 49.99,
    e: 0.28729885057471266
  },
  {
    t: 'Police Pursuit 42091',
    no: 120,
    p: 35.97,
    e: 0.29975
  },
  {
    t: 'Telehandler 42061',
    no: 260,
    p: 77.99,
    e: 0.29996153846153845
  },
  {
    t: 'Fire Plane 42040',
    no: 578,
    p: 174.67,
    e: 0.30219723183391
  },
  {
    t: '24 Hours Race Car 42039',
    no: 1219,
    p: 375.5,
    e: 0.308039376538146
  },
  {
    t: 'Compact Tracked Loader 42032',
    no: 145,
    p: 44.9,
    e: 0.3096551724137931
  },
  {
    t: 'Getaway Racer 42046',
    no: 170,
    p: 55.33,
    e: 0.3254705882352941
  },
  {
    t: 'Porsche 911 GT3 RS 42056',
    no: 2704,
    p: 899.99,
    e: 0.3328365384615385
  },
  {
    t: 'Service Truck 42008',
    no: 1224,
    p: 427.5,
    e: 0.3492647058823529
  },
  {
    t: 'Street Motorcycle 42036',
    no: 375,
    p: 134.99,
    e: 0.35997333333333337
  },
  {
    t: 'Stunt Truck 42059',
    no: 142,
    p: 54.99,
    e: 0.3872535211267606
  },
  {
    t: 'Cherry Picker 42031',
    no: 155,
    p: 60.7,
    e: 0.3916129032258065
  },
  {
    t: ', From 7 years, 135 Pieces, Theme: Building£53.52',
    no: 135,
    p: 53.52,
    e: 0.3964444444444445
  },
  {
    t: 'Display Team Jet 42044',
    no: 113,
    p: 47.5,
    e: 0.42035398230088494
  },
  {
    t: 'Bash! 42073',
    no: 139,
    p: 73.83,
    e: 0.5311510791366907
  },
  {
    t: 'Off-road Racer 42010',
    no: 160,
    p: 86.65,
    e: 0.5415625000000001
  },
  {
    t: 'Quad Bike 42034',
    no: 148,
    p: 87.5,
    e: 0.5912162162162162
  },
  {
    t: 'Dozer Compactor 42071',
    no: 171,
    p: 121.42,
    e: 0.7100584795321637
  },
  {
    t: 'Black Champion Racer 42026',
    no: 138,
    p: 153.9,
    e: 1.115217391304348
  },
  {
    t: 'Powered Up Large Motor 88013',
    no: 1,
    p: 23.99,
    e: 23.99
  },
  {
    t: 'XL Motor Powered Up 88014',
    no: 1,
    p: 25.49,
    e: 25.49
  },
  {
    t: 'Power Functions L Motor 88003',
    no: 1,
    p: 27.9,
    e: 27.9
  },
  {
    t: 'Power Functions Motor Set 8293',
    no: 10,
    p: 343,
    e: 34.3
  }
]
