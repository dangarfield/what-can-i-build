//  https://www.pricerunner.com/cl/72/Toys?attr_57121593=57121615&attr_57121617=60430082&sort=price_asc

const d = [...document.querySelectorAll('.k6oEmfY83J')].map(p => p.textContent).filter(t => t.includes('Pieces')).map(e => { return { e, no: parseInt(e.split('Pieces')[0].split(' ').filter(t => t !== '').reverse()[0]), p: parseFloat(parseFloat(e.split('£')[1]).toFixed(2)) } }).map(a => { return { t: a.e.split('Lego Technic')[1].trim(), no: a.no, p: a.p, e: a.p / a.no } }).sort((a, b) => a.e - b.e).map(e => JSON.stringify(e))

const feb17 = [
  '{"t":"Porsche 911 GT3 RS 42056","no":2704,"p":1,"e":0.0003698224852071006}',
  '{"t":"McLaren Senna GTR 42123","no":830,"p":34.95,"e":0.04210843373493976}',
  '{"t":"Monster Jam Grave Digger 42118","no":212,"p":9,"e":0.04245283018867924}',
  '{"t":"Bugatti Bolide 42151","no":905,"p":39.99,"e":0.04418784530386741}',
  '{"t":"Car Transporter 42098","no":2493,"p":119.95,"e":0.04811472121941436}',
  '{"t":"The Batman Batmobile 42127","no":1360,"p":66.99,"e":0.04925735294117647}',
  '{"t":"Snow Groomer 42148","no":178,"p":8.99,"e":0.05050561797752809}',
  '{"t":"Ford F 150 Raptor 42126","no":1379,"p":69.99,"e":0.050754169688179834}',
  '{"t":"Dump Truck 42147","no":177,"p":8.99,"e":0.0507909604519774}',
  '{"t":"Rescue Hovercraft 42120","no":457,"p":23.95,"e":0.0524070021881838}',
  '{"t":"Jeep Wrangler 42122","no":665,"p":34.99,"e":0.052616541353383464}',
  '{"t":"Motorcycle 42132","no":163,"p":8.99,"e":0.055153374233128834}',
  '{"t":"Heavy-Duty Excavator 42121","no":569,"p":31.99,"e":0.056221441124780315}',
  '{"t":"Land Rover Defender 42110","no":2573,"p":149.99,"e":0.058293820443062576}',
  '{"t":"Race Plane 42117","no":154,"p":8.99,"e":0.05837662337662338}',
  '{"t":"Stunt Show Truck & Bike 42106","no":610,"p":35.99,"e":0.059000000000000004}',
  '{"t":"Monster Jam™ El Toro Loco™ 42135","no":247,"p":14.99,"e":0.06068825910931174}',
  '{"t":"Monster Jam Megalodon 42134","no":260,"p":15.99,"e":0.0615}',
  '{"t":"Mobile Crane 42108","no":1292,"p":79.99,"e":0.06191176470588235}',
  '{"t":"Telehandler 42133","no":143,"p":8.99,"e":0.06286713286713287}',
  '{"t":"John Deere 9620R 4WD Tractor 42136","no":390,"p":24.99,"e":0.06407692307692307}',
  '{"t":"Ford Mustang Shelby GT500","no":544,"p":34.99,"e":0.06431985294117648}',
  '{"t":"Catamaran 42105","no":404,"p":27,"e":0.06683168316831684}',
  '{"t":"Heavy Tow Truck 42128","no":2017,"p":138.99,"e":0.06890927119484383}',
  '{"t":"Mini Claas Xerion 42102","no":130,"p":9.01,"e":0.0693076923076923}',
  '{"t":"Porsche 911 RSR 42096","no":1580,"p":109.99,"e":0.06961392405063291}',
  '{"t":"Monster Mutt Dalmatian 42150","no":244,"p":16.99,"e":0.0696311475409836}',
  '{"t":"All Terrain Vehicle 42139","no":764,"p":53.99,"e":0.0706675392670157}',
  '{"t":"Airbus H175 Rescue Helicopter 42145","no":2001,"p":144.99,"e":0.07245877061469266}',
  '{"t":"Lamborghini Sian FKP 37 42115","no":3696,"p":270,"e":0.07305194805194805}',
  '{"t":"Rough Terrain Crane 42082","no":4057,"p":299.9,"e":0.0739216169583436}',
  '{"t":"Ducati Panigale V4 R 42107","no":646,"p":48.74,"e":0.07544891640866873}',
  '{"t":"Rescue Helicopter 42092","no":325,"p":24.99,"e":0.07689230769230769}',
  '{"t":"Concrete Mixer Truck 42112","no":1163,"p":89.99,"e":0.0773774720550301}',
  '{"t":"Monster Jam Max-D 42119","no":230,"p":17.99,"e":0.07821739130434782}',
  '{"t":"Ferrari Daytona SP3 42143","no":3778,"p":299.99,"e":0.07940444679724723}',
  '{"t":"Dragster 42103","no":225,"p":17.99,"e":0.07995555555555554}',
  '{"t":"Ferrari 488 GTE AF Corse #51 42125","no":1682,"p":137.98,"e":0.08203329369797858}',
  "{\"t\":\"Dom's Dodge Charger 42111\",\"no\":1077,\"p\":88.47,\"e\":0.08214484679665739}",
  '{"t":"Monster Jam Dragon 42149","no":217,"p":17.99,"e":0.08290322580645161}',
  '{"t":"Formula E Porsche 99X Electric 42137","no":422,"p":34.99,"e":0.08291469194312796}',
  '{"t":"Extreme Adventure 42069","no":2382,"p":199.99,"e":0.08395885810243493}',
  '{"t":"Chevrolet Corvette ZR1 42093","no":579,"p":49.74,"e":0.08590673575129534}',
  '{"t":"Bugatti Chiron 42083","no":3599,"p":319.99,"e":0.08891080855793276}',
  '{"t":"Liebherr R 9800 Excavator 42100","no":4108,"p":373.49,"e":0.09091772151898735}',
  '{"t":"BMW M 1000 RR 42130","no":1920,"p":174.94,"e":0.09111458333333333}',
  '{"t":"Mercedes-Benz Zetros Trial Truck 42129","no":2110,"p":196.64,"e":0.09319431279620853}',
  '{"t":"Material Handler 42144","no":835,"p":77.99,"e":0.09340119760479042}',
  '{"t":"App Controlled D11 Bulldozer 42131","no":3854,"p":364.95,"e":0.09469382459782044}',
  '{"t":"McLaren Formula 1 42141","no":1432,"p":139,"e":0.09706703910614525}',
  '{"t":"Mack Anthem 42078","no":2595,"p":271.61,"e":0.10466666666666667}',
  '{"t":"Volvo 6x6 Articulated Truck 42114","no":2193,"p":229.99,"e":0.10487460100319197}',
  '{"t":"Hovercraft 42076","no":1020,"p":108.99,"e":0.10685294117647058}',
  '{"t":"Hook Loader 42084","no":176,"p":19.95,"e":0.11335227272727272}',
  '{"t":"Helicopter 30465","no":70,"p":7.99,"e":0.11414285714285714}',
  '{"t":"Bucket Wheel Excavator 42055","no":3929,"p":469.99,"e":0.11962076864342072}',
  '{"t":"Volvo Concept Wheel Loader ZEUX 42081","no":1167,"p":139.95,"e":0.11992287917737789}',
  '{"t":"First Responder 42075","no":513,"p":62.77,"e":0.12235867446393763}',
  '{"t":"Race Truck 42104","no":227,"p":27.95,"e":0.12312775330396475}',
  '{"t":"Volvo Wheel Loader 30433","no":69,"p":8.94,"e":0.12956521739130433}',
  '{"t":"Rally Car 42077","no":1005,"p":139.89,"e":0.13919402985074625}',
  '{"t":"Getaway Truck 42090","no":128,"p":18,"e":0.140625}',
  '{"t":"Compact Crawler Crane 42097","no":920,"p":129.99,"e":0.14129347826086958}',
  '{"t":"App Controlled Transformation Vehicle 42140","no":772,"p":110.61,"e":0.14327720207253886}',
  '{"t":"Forest Machine 42080","no":1003,"p":149.99,"e":0.14954137587238286}',
  '{"t":"Heavy Duty Forklift 42079","no":592,"p":89.53,"e":0.1512331081081081}',
  '{"t":"Arctic Truck 42038","no":913,"p":144.99,"e":0.15880613362541074}',
  '{"t":"6x6 All Terrain Tow Truck 42070","no":1862,"p":309.99,"e":0.16648227712137487}',
  '{"t":"Formula Off-Roader 42037","no":494,"p":83.9,"e":0.16983805668016194}',
  '{"t":"Tracked Loader 42094","no":827,"p":144.99,"e":0.17532043530834343}',
  '{"t":"24 Hours Race Car 42039","no":1219,"p":214.99,"e":0.17636587366694012}',
  '{"t":"Mobile Crane MK II 42009","no":2606,"p":474.99,"e":0.1822678434382195}',
  '{"t":"Mercedes-Benz Arocs 3245 42043","no":2793,"p":515,"e":0.18438954529180093}',
  '{"t":"Volvo EW160E 42053","no":1166,"p":224.99,"e":0.19295883361921098}',
  '{"t":"Cherry Picker 42088","no":155,"p":30.18,"e":0.19470967741935483}',
  '{"t":"Mine Loader 42049","no":476,"p":96.99,"e":0.20376050420168065}',
  '{"t":"Hot Rod 42022","no":414,"p":87.06,"e":0.21028985507246378}',
  '{"t":"Racing Yacht 42074","no":330,"p":69.99,"e":0.21209090909090908}',
  '{"t":"Air Race Jet 42066","no":1151,"p":244.99,"e":0.21284969591659428}',
  '{"t":"Remote Controlled Stunt Racer 42095","no":324,"p":70,"e":0.21604938271604937}',
  '{"t":"Drag Racer 42050","no":647,"p":149.99,"e":0.23182380216383308}',
  '{"t":"Display Team Jet 42044","no":113,"p":26.42,"e":0.2338053097345133}',
  '{"t":"Heavy Lift Helicopter 42052","no":1043,"p":260.03,"e":0.2493096836049856}',
  '{"t":", From 7 years, 135 Pieces, Theme: Building£33.99","no":135,"p":33.99,"e":0.25177777777777777}',
  '{"t":"Logging Truck 9397","no":1308,"p":334.99,"e":0.2561085626911315}',
  '{"t":"Hydroplane Racer 42045","no":180,"p":46.89,"e":0.2605}',
  '{"t":"4x4 X Treme Off Roader 42099","no":958,"p":249.95,"e":0.2609081419624217}',
  '{"t":"Stunt Bike 42058","no":140,"p":38.95,"e":0.27821428571428575}',
  '{"t":"Off-Road Buggy 42124","no":374,"p":104.99,"e":0.2807219251336898}',
  '{"t":"Container Truck 42024","no":948,"p":266.5,"e":0.2811181434599156}',
  '{"t":"Stunt Truck 42059","no":142,"p":39.99,"e":0.28161971830985916}',
  '{"t":"Power Boat 42089","no":174,"p":49.9,"e":0.2867816091954023}',
  '{"t":"Remote Controlled Volvo L350F Wheel Loader 42030","no":1636,"p":489.99,"e":0.29950488997555014}',
  '{"t":"BMW R 1200 GS Adventure 42063","no":603,"p":187.35,"e":0.3106965174129353}',
  '{"t":"Police Pursuit 42091","no":120,"p":37.44,"e":0.312}',
  '{"t":"Police Interceptor 42047","no":185,"p":58.21,"e":0.31464864864864867}',
  '{"t":"RC Tracked Racer 42065","no":370,"p":119.06,"e":0.3217837837837838}',
  '{"t":"Fire Plane 42040","no":578,"p":193.1,"e":0.334083044982699}',
  '{"t":"Getaway Racer 42046","no":170,"p":56.99,"e":0.3352352941176471}',
  '{"t":"Cherry Picker 42031","no":155,"p":52.19,"e":0.3367096774193548}',
  '{"t":"Service Truck 42008","no":1224,"p":427.5,"e":0.3492647058823529}',
  '{"t":"Dozer Compactor 42071","no":171,"p":59.99,"e":0.3508187134502924}',
  '{"t":"Buggy 42101","no":117,"p":41.17,"e":0.3518803418803419}',
  '{"t":"Bash! 42073","no":139,"p":49.25,"e":0.35431654676258995}',
  '{"t":"Street Motorcycle 42036","no":375,"p":134.99,"e":0.35997333333333337}',
  '{"t":"Telehandler 42061","no":260,"p":99.54,"e":0.3828461538461539}',
  '{"t":"Snowmobile 42021","no":186,"p":77.99,"e":0.41930107526881716}',
  '{"t":"Compact Tracked Loader 42032","no":145,"p":73.99,"e":0.5102758620689655}',
  '{"t":"App Controlled Top Gear Rally Car 42109","no":463,"p":236.5,"e":0.5107991360691144}',
  '{"t":"Quad Bike 42034","no":148,"p":87.5,"e":0.5912162162162162}',
  '{"t":"Record Breaker 42033","no":125,"p":78.5,"e":0.628}',
  '{"t":"Ultralight Helicopter 42057","no":199,"p":129.42,"e":0.6503517587939698}',
  '{"t":"Off-road Racer 42010","no":160,"p":113.92,"e":0.712}',
  '{"t":"Desert Racer 42027","no":149,"p":123,"e":0.825503355704698}',
  '{"t":"Twin-rotor Helicopter 42020","no":145,"p":135,"e":0.9310344827586207}',
  '{"t":"Black Champion Racer 42026","no":138,"p":153.9,"e":1.115217391304348}',
  '{"t":"XL Motor Powered Up 88014","no":1,"p":20.99,"e":20.99}',
  '{"t":"Power Functions L Motor 88003","no":1,"p":27.9,"e":27.9}',
  '{"t":"Powered Up Large Motor 88013","no":1,"p":29.99,"e":29.99}',
  '{"t":"Power Functions Motor Set 8293","no":10,"p":421,"e":42.1}'
]

const jan09 = [[
  '{"t":"McLaren Senna GTR 42123","no":830,"p":34.99,"e":0.0421566265060241}',
  '{"t":"Catamaran 42105","no":404,"p":18,"e":0.04455445544554455}',
  '{"t":"Land Rover Defender 42110","no":2573,"p":120,"e":0.046638165565487756}',
  '{"t":"Car Transporter 42098","no":2493,"p":119.95,"e":0.04811472121941436}',
  '{"t":"Ford F 150 Raptor 42126","no":1379,"p":69.99,"e":0.050754169688179834}',
  '{"t":"Dump Truck 42147","no":177,"p":8.99,"e":0.0507909604519774}',
  '{"t":"Rescue Hovercraft 42120","no":457,"p":23.95,"e":0.0524070021881838}',
  '{"t":"The Batman Batmobile 42127","no":1360,"p":72,"e":0.052941176470588235}',
  '{"t":"Motorcycle 42132","no":163,"p":9,"e":0.05521472392638037}',
  '{"t":"Monster Jam Megalodon 42134","no":260,"p":14.4,"e":0.055384615384615386}',
  '{"t":"Heavy-Duty Excavator 42121","no":569,"p":31.99,"e":0.056221441124780315}',
  '{"t":"Race Plane 42117","no":154,"p":8.99,"e":0.05837662337662338}',
  '{"t":"Stunt Show Truck & Bike 42106","no":610,"p":35.99,"e":0.059000000000000004}',
  '{"t":"Monster Jam™ El Toro Loco™ 42135","no":247,"p":14.99,"e":0.06068825910931174}',
  '{"t":"Jeep Wrangler 42122","no":665,"p":40.95,"e":0.06157894736842106}',
  '{"t":"Mobile Crane 42108","no":1292,"p":79.99,"e":0.06191176470588235}',
  '{"t":"Telehandler 42133","no":143,"p":8.99,"e":0.06286713286713287}',
  '{"t":"John Deere 9620R 4WD Tractor 42136","no":390,"p":24.99,"e":0.06407692307692307}',
  '{"t":"Mini Claas Xerion 42102","no":130,"p":9.01,"e":0.0693076923076923}',
  '{"t":"Heavy Tow Truck 42128","no":2017,"p":139.99,"e":0.06940505701536936}',
  '{"t":"Bugatti Chiron 42083","no":3599,"p":250,"e":0.06946373992775771}',
  '{"t":"Porsche 911 RSR 42096","no":1580,"p":109.99,"e":0.06961392405063291}',
  '{"t":"All Terrain Vehicle 42139","no":764,"p":55,"e":0.07198952879581152}',
  '{"t":"Ford Mustang Shelby GT500","no":544,"p":39.95,"e":0.0734375}',
  '{"t":"Rough Terrain Crane 42082","no":4057,"p":299.9,"e":0.0739216169583436}',
  '{"t":"Airbus H175 Rescue Helicopter 42145","no":2001,"p":149.99,"e":0.07495752123938032}',
  '{"t":"Lamborghini Sian FKP 37 42115","no":3696,"p":279.95,"e":0.07574404761904761}',
  '{"t":"Ducati Panigale V4 R 42107","no":646,"p":49.73,"e":0.0769814241486068}',
  '{"t":"Concrete Mixer Truck 42112","no":1163,"p":89.99,"e":0.0773774720550301}',
  '{"t":"Monster Jam Max-D 42119","no":230,"p":17.99,"e":0.07821739130434782}',
  '{"t":"Ferrari Daytona SP3 42143","no":3778,"p":300,"e":0.07940709370037057}',
  "{\"t\":\"Dom's Dodge Charger 42111\",\"no\":1077,\"p\":86,\"e\":0.07985143918291551}",
  '{"t":"Dragster 42103","no":225,"p":17.99,"e":0.07995555555555554}',
  '{"t":"Monster Jam Grave Digger 42118","no":212,"p":16.99,"e":0.08014150943396225}',
  '{"t":"Mercedes-Benz Zetros Trial Truck 42129","no":2110,"p":173.99,"e":0.08245971563981043}',
  '{"t":"Monster Jam Dragon 42149","no":217,"p":17.99,"e":0.08290322580645161}',
  '{"t":"Ferrari 488 GTE AF Corse #51 42125","no":1682,"p":140,"e":0.08323424494649227}',
  '{"t":"Extreme Adventure 42069","no":2382,"p":199.95,"e":0.08394206549118387}',
  '{"t":"Chevrolet Corvette ZR1 42093","no":579,"p":49.74,"e":0.08590673575129534}',
  '{"t":"BMW M 1000 RR 42130","no":1920,"p":169.99,"e":0.08853645833333333}',
  '{"t":"Liebherr R 9800 Excavator 42100","no":4108,"p":372.11,"e":0.09058179162609542}',
  '{"t":"McLaren Formula 1 42141","no":1432,"p":129.99,"e":0.09077513966480448}',
  '{"t":"Material Handler 42144","no":835,"p":77.99,"e":0.09340119760479042}',
  '{"t":"App Controlled D11 Bulldozer 42131","no":3854,"p":364.95,"e":0.09469382459782044}',
  '{"t":"Formula E Porsche 99X Electric 42137","no":422,"p":43.95,"e":0.10414691943127963}',
  '{"t":"Volvo 6x6 Articulated Truck 42114","no":2193,"p":229.99,"e":0.10487460100319197}',
  '{"t":"Mack Anthem 42078","no":2595,"p":285.45,"e":0.11}',
  '{"t":"Hovercraft 42076","no":1020,"p":112.79,"e":0.11057843137254902}',
  '{"t":"Hook Loader 42084","no":176,"p":19.95,"e":0.11335227272727272}',
  '{"t":"Helicopter 30465","no":70,"p":7.99,"e":0.11414285714285714}',
  '{"t":"Bucket Wheel Excavator 42055","no":3929,"p":449.99,"e":0.11453041486383304}',
  '{"t":"Race Truck 42104","no":227,"p":27.95,"e":0.12312775330396475}',
  '{"t":"Volvo Concept Wheel Loader ZEUX 42081","no":1167,"p":145.99,"e":0.1250985432733505}',
  '{"t":"Rescue Helicopter 42092","no":325,"p":43.14,"e":0.13273846153846153}',
  '{"t":"Rally Car 42077","no":1005,"p":134.86,"e":0.13418905472636816}',
  '{"t":"Compact Crawler Crane 42097","no":920,"p":123.95,"e":0.13472826086956521}',
  '{"t":"Volvo Wheel Loader 30433","no":69,"p":9.59,"e":0.13898550724637682}',
  '{"t":"Getaway Truck 42090","no":128,"p":18,"e":0.140625}',
  '{"t":"App Controlled Transformation Vehicle 42140","no":772,"p":110,"e":0.14248704663212436}',
  '{"t":"First Responder 42075","no":513,"p":75,"e":0.14619883040935672}',
  '{"t":"Volvo EW160E 42053","no":1166,"p":172.99,"e":0.14836192109777016}',
  '{"t":"6x6 All Terrain Tow Truck 42070","no":1862,"p":277.04,"e":0.14878625134264234}',
  '{"t":"Heavy Duty Forklift 42079","no":592,"p":88.5,"e":0.14949324324324326}',
  '{"t":"Forest Machine 42080","no":1003,"p":156.26,"e":0.1557926221335992}',
  '{"t":"Air Race Jet 42066","no":1151,"p":179.95,"e":0.15634231103388357}',
  '{"t":"Tracked Loader 42094","no":827,"p":144.99,"e":0.17532043530834343}',
  '{"t":"24 Hours Race Car 42039","no":1219,"p":214.99,"e":0.17636587366694012}',
  '{"t":"Arctic Truck 42038","no":913,"p":163.99,"e":0.17961664841182914}',
  '{"t":"Mercedes-Benz Arocs 3245 42043","no":2793,"p":515,"e":0.18438954529180093}',
  '{"t":"Formula Off-Roader 42037","no":494,"p":94.99,"e":0.19228744939271253}',
  '{"t":"Mine Loader 42049","no":476,"p":96.99,"e":0.20376050420168065}',
  '{"t":"Hot Rod 42022","no":414,"p":87.06,"e":0.21028985507246378}',
  '{"t":"Racing Yacht 42074","no":330,"p":69.99,"e":0.21209090909090908}',
  '{"t":"Remote Controlled Stunt Racer 42095","no":324,"p":70,"e":0.21604938271604937}',
  '{"t":"Drag Racer 42050","no":647,"p":149.99,"e":0.23182380216383308}',
  '{"t":"Hydroplane Racer 42045","no":180,"p":46.89,"e":0.2605}',
  '{"t":"4x4 X Treme Off Roader 42099","no":958,"p":249.99,"e":0.2609498956158664}',
  '{"t":"Dozer Compactor 42071","no":171,"p":45,"e":0.2631578947368421}',
  '{"t":"Off-Road Buggy 42124","no":374,"p":104.99,"e":0.2807219251336898}',
  '{"t":"Container Truck 42024","no":948,"p":266.5,"e":0.2811181434599156}',
  '{"t":"Police Pursuit 42091","no":120,"p":36.38,"e":0.3031666666666667}',
  '{"t":"Remote Controlled Volvo L350F Wheel Loader 42030","no":1636,"p":514.99,"e":0.31478606356968214}',
  '{"t":"Power Boat 42089","no":174,"p":54.99,"e":0.3160344827586207}',
  '{"t":"Porsche 911 GT3 RS 42056","no":2704,"p":857.63,"e":0.3171708579881657}',
  '{"t":"Display Team Jet 42044","no":113,"p":36,"e":0.3185840707964602}',
  '{"t":"Getaway Racer 42046","no":170,"p":56.99,"e":0.3352352941176471}',
  '{"t":", From 7 years, 135 Pieces, Theme: Building£46.82","no":135,"p":46.82,"e":0.3468148148148148}',
  '{"t":"Service Truck 42008","no":1224,"p":427.5,"e":0.3492647058823529}',
  '{"t":"Bash! 42073","no":139,"p":49.25,"e":0.35431654676258995}',
  '{"t":"Cherry Picker 42088","no":155,"p":55.24,"e":0.35638709677419356}',
  '{"t":"BMW R 1200 GS Adventure 42063","no":603,"p":220.5,"e":0.3656716417910448}',
  '{"t":"Stunt Truck 42059","no":142,"p":53.99,"e":0.38021126760563384}',
  '{"t":"Telehandler 42061","no":260,"p":99.54,"e":0.3828461538461539}',
  '{"t":"Street Motorcycle 42036","no":375,"p":145.32,"e":0.38752}',
  '{"t":"Snowmobile 42021","no":186,"p":77.99,"e":0.41930107526881716}',
  '{"t":"Cherry Picker 42031","no":155,"p":68.96,"e":0.4449032258064516}',
  '{"t":"Police Interceptor 42047","no":185,"p":82.83,"e":0.44772972972972974}',
  '{"t":"Fire Plane 42040","no":578,"p":264.5,"e":0.45761245674740486}',
  '{"t":"Compact Tracked Loader 42032","no":145,"p":73.99,"e":0.5102758620689655}',
  '{"t":"App Controlled Top Gear Rally Car 42109","no":463,"p":236.5,"e":0.5107991360691144}',
  '{"t":"Stunt Bike 42058","no":140,"p":73.34,"e":0.5238571428571429}',
  '{"t":"Off-road Racer 42010","no":160,"p":88.54,"e":0.5533750000000001}',
  '{"t":"Buggy 42101","no":117,"p":66.24,"e":0.5661538461538461}',
  '{"t":"Quad Bike 42034","no":148,"p":87.5,"e":0.5912162162162162}',
  '{"t":"Record Breaker 42033","no":125,"p":78.5,"e":0.628}',
  '{"t":"Desert Racer 42027","no":149,"p":97.1,"e":0.6516778523489932}',
  '{"t":"Black Champion Racer 42026","no":138,"p":153.9,"e":1.115217391304348}',
  '{"t":"XL Motor Powered Up 88014","no":1,"p":20.99,"e":20.99}',
  '{"t":"Power Functions L Motor 88003","no":1,"p":27.9,"e":27.9}',
  '{"t":"Powered Up Large Motor 88013","no":1,"p":29.99,"e":29.99}'
]]

const jan22 = [
  '{"t":"Monster Jam Grave Digger 42118","no":212,"p":9,"e":0.04245283018867924}',
  '{"t":"McLaren Senna GTR 42123","no":830,"p":35.99,"e":0.04336144578313253}',
  '{"t":"Catamaran 42105","no":404,"p":18,"e":0.04455445544554455}',
  '{"t":"Bugatti Bolide 42151","no":905,"p":40.99,"e":0.04529281767955801}',
  '{"t":"Land Rover Defender 42110","no":2573,"p":120,"e":0.046638165565487756}',
  '{"t":"Car Transporter 42098","no":2493,"p":119.95,"e":0.04811472121941436}',
  '{"t":"Snow Groomer 42148","no":178,"p":8.99,"e":0.05050561797752809}',
  '{"t":"Ford F 150 Raptor 42126","no":1379,"p":69.99,"e":0.050754169688179834}',
  '{"t":"Dump Truck 42147","no":177,"p":8.99,"e":0.0507909604519774}',
  '{"t":"Rescue Hovercraft 42120","no":457,"p":23.95,"e":0.0524070021881838}',
  '{"t":"The Batman Batmobile 42127","no":1360,"p":71.99,"e":0.05293382352941176}',
  '{"t":"Jeep Wrangler 42122","no":665,"p":36,"e":0.05413533834586466}',
  '{"t":"Motorcycle 42132","no":163,"p":8.99,"e":0.055153374233128834}',
  '{"t":"Heavy-Duty Excavator 42121","no":569,"p":31.99,"e":0.056221441124780315}',
  '{"t":"Monster Jam™ El Toro Loco™ 42135","no":247,"p":13.99,"e":0.05663967611336033}',
  '{"t":"Race Plane 42117","no":154,"p":8.99,"e":0.05837662337662338}',
  '{"t":"Stunt Show Truck & Bike 42106","no":610,"p":35.99,"e":0.059000000000000004}',
  '{"t":"Monster Jam Megalodon 42134","no":260,"p":15.99,"e":0.0615}',
  '{"t":"Mobile Crane 42108","no":1292,"p":79.99,"e":0.06191176470588235}',
  '{"t":"Telehandler 42133","no":143,"p":8.99,"e":0.06286713286713287}',
  '{"t":"John Deere 9620R 4WD Tractor 42136","no":390,"p":24.99,"e":0.06407692307692307}',
  '{"t":"Heavy Tow Truck 42128","no":2017,"p":137.99,"e":0.0684134853743183}',
  '{"t":"Mini Claas Xerion 42102","no":130,"p":9.01,"e":0.0693076923076923}',
  '{"t":"Bugatti Chiron 42083","no":3599,"p":250,"e":0.06946373992775771}',
  '{"t":"Porsche 911 RSR 42096","no":1580,"p":109.99,"e":0.06961392405063291}',
  '{"t":"Monster Mutt Dalmatian 42150","no":244,"p":16.99,"e":0.0696311475409836}',
  '{"t":"All Terrain Vehicle 42139","no":764,"p":54.99,"e":0.07197643979057591}',
  '{"t":"Ford Mustang Shelby GT500","no":544,"p":39.95,"e":0.0734375}',
  '{"t":"Rough Terrain Crane 42082","no":4057,"p":299.9,"e":0.0739216169583436}',
  '{"t":"Airbus H175 Rescue Helicopter 42145","no":2001,"p":149.99,"e":0.07495752123938032}',
  '{"t":"Lamborghini Sian FKP 37 42115","no":3696,"p":279.95,"e":0.07574404761904761}',
  '{"t":"Ducati Panigale V4 R 42107","no":646,"p":49.05,"e":0.07592879256965944}',
  '{"t":"Rescue Helicopter 42092","no":325,"p":24.99,"e":0.07689230769230769}',
  '{"t":"Concrete Mixer Truck 42112","no":1163,"p":89.99,"e":0.0773774720550301}',
  '{"t":"Monster Jam Max-D 42119","no":230,"p":17.99,"e":0.07821739130434782}',
  '{"t":"Ferrari Daytona SP3 42143","no":3778,"p":300,"e":0.07940709370037057}',
  "{\"t\":\"Dom's Dodge Charger 42111\",\"no\":1077,\"p\":86,\"e\":0.07985143918291551}",
  '{"t":"Dragster 42103","no":225,"p":17.99,"e":0.07995555555555554}',
  '{"t":"Monster Jam Dragon 42149","no":217,"p":17.99,"e":0.08290322580645161}',
  '{"t":"Extreme Adventure 42069","no":2382,"p":199.99,"e":0.08395885810243493}',
  '{"t":"Ferrari 488 GTE AF Corse #51 42125","no":1682,"p":144.49,"e":0.0859036860879905}',
  '{"t":"Chevrolet Corvette ZR1 42093","no":579,"p":49.74,"e":0.08590673575129534}',
  '{"t":"Mercedes-Benz Zetros Trial Truck 42129","no":2110,"p":183.99,"e":0.08719905213270143}',
  '{"t":"Liebherr R 9800 Excavator 42100","no":4108,"p":363.23,"e":0.08842015579357351}',
  '{"t":"BMW M 1000 RR 42130","no":1920,"p":174.3,"e":0.09078125000000001}',
  '{"t":"Material Handler 42144","no":835,"p":77.99,"e":0.09340119760479042}',
  '{"t":"App Controlled D11 Bulldozer 42131","no":3854,"p":364.95,"e":0.09469382459782044}',
  '{"t":"McLaren Formula 1 42141","no":1432,"p":139,"e":0.09706703910614525}',
  '{"t":"Formula E Porsche 99X Electric 42137","no":422,"p":42.94,"e":0.10175355450236967}',
  '{"t":"Mack Anthem 42078","no":2595,"p":271.72,"e":0.10470905587668594}',
  '{"t":"Volvo 6x6 Articulated Truck 42114","no":2193,"p":229.99,"e":0.10487460100319197}',
  '{"t":"Hovercraft 42076","no":1020,"p":112.79,"e":0.11057843137254902}',
  '{"t":"Hook Loader 42084","no":176,"p":19.95,"e":0.11335227272727272}',
  '{"t":"Helicopter 30465","no":70,"p":7.99,"e":0.11414285714285714}',
  '{"t":"Bucket Wheel Excavator 42055","no":3929,"p":449.99,"e":0.11453041486383304}',
  '{"t":"Volvo Concept Wheel Loader ZEUX 42081","no":1167,"p":139.95,"e":0.11992287917737789}',
  '{"t":"Race Truck 42104","no":227,"p":27.95,"e":0.12312775330396475}',
  '{"t":"First Responder 42075","no":513,"p":64.99,"e":0.12668615984405457}',
  '{"t":"Volvo Wheel Loader 30433","no":69,"p":9.04,"e":0.13101449275362317}',
  '{"t":"Compact Crawler Crane 42097","no":920,"p":127.99,"e":0.1391195652173913}',
  '{"t":"Rally Car 42077","no":1005,"p":139.99,"e":0.13929353233830846}',
  '{"t":"Getaway Truck 42090","no":128,"p":18,"e":0.140625}',
  '{"t":"App Controlled Transformation Vehicle 42140","no":772,"p":113.7,"e":0.147279792746114}',
  '{"t":"Heavy Duty Forklift 42079","no":592,"p":88.55,"e":0.1495777027027027}',
  '{"t":"Air Race Jet 42066","no":1151,"p":179.93,"e":0.1563249348392702}',
  '{"t":"Forest Machine 42080","no":1003,"p":158.16,"e":0.15768693918245263}',
  '{"t":"Formula Off-Roader 42037","no":494,"p":83.03,"e":0.16807692307692307}',
  '{"t":"Tracked Loader 42094","no":827,"p":144.99,"e":0.17532043530834343}',
  '{"t":"24 Hours Race Car 42039","no":1219,"p":214.99,"e":0.17636587366694012}',
  '{"t":"Arctic Truck 42038","no":913,"p":163.99,"e":0.17961664841182914}',
  '{"t":"Racing Yacht 42074","no":330,"p":59.99,"e":0.1817878787878788}',
  '{"t":"Mobile Crane MK II 42009","no":2606,"p":474.99,"e":0.1822678434382195}',
  '{"t":"Mercedes-Benz Arocs 3245 42043","no":2793,"p":515,"e":0.18438954529180093}',
  '{"t":"Volvo EW160E 42053","no":1166,"p":224.99,"e":0.19295883361921098}',
  '{"t":"Mine Loader 42049","no":476,"p":96.99,"e":0.20376050420168065}',
  '{"t":"Hot Rod 42022","no":414,"p":87.06,"e":0.21028985507246378}',
  '{"t":"Remote Controlled Stunt Racer 42095","no":324,"p":70,"e":0.21604938271604937}',
  '{"t":"Drag Racer 42050","no":647,"p":149.99,"e":0.23182380216383308}',
  '{"t":"Ultralight Helicopter 42057","no":199,"p":48.99,"e":0.24618090452261307}',
  '{"t":"Hydroplane Racer 42045","no":180,"p":46.89,"e":0.2605}',
  '{"t":"4x4 X Treme Off Roader 42099","no":958,"p":259.99,"e":0.2713883089770355}',
  '{"t":"Stunt Bike 42058","no":140,"p":38.99,"e":0.2785}',
  '{"t":"Off-Road Buggy 42124","no":374,"p":104.99,"e":0.2807219251336898}',
  '{"t":"Container Truck 42024","no":948,"p":266.5,"e":0.2811181434599156}',
  '{"t":"Stunt Truck 42059","no":142,"p":41.99,"e":0.2957042253521127}',
  '{"t":"Police Pursuit 42091","no":120,"p":36.32,"e":0.3026666666666667}',
  '{"t":"Remote Controlled Volvo L350F Wheel Loader 42030","no":1636,"p":514.99,"e":0.31478606356968214}',
  '{"t":"Power Boat 42089","no":174,"p":54.99,"e":0.3160344827586207}',
  '{"t":"Porsche 911 GT3 RS 42056","no":2704,"p":857.63,"e":0.3171708579881657}',
  '{"t":"Display Team Jet 42044","no":113,"p":36,"e":0.3185840707964602}',
  '{"t":"Getaway Racer 42046","no":170,"p":56.99,"e":0.3352352941176471}',
  '{"t":"Fire Plane 42040","no":578,"p":199.74,"e":0.3455709342560554}',
  '{"t":", From 7 years, 135 Pieces, Theme: Building£46.82£34.95","no":135,"p":46.82,"e":0.3468148148148148}',
  '{"t":"Service Truck 42008","no":1224,"p":427.5,"e":0.3492647058823529}',
  '{"t":"Dozer Compactor 42071","no":171,"p":59.99,"e":0.3508187134502924}',
  '{"t":"Bash! 42073","no":139,"p":49.25,"e":0.35431654676258995}',
  '{"t":"Cherry Picker 42088","no":155,"p":55.24,"e":0.35638709677419356}',
  '{"t":"Street Motorcycle 42036","no":375,"p":134.99,"e":0.35997333333333337}',
  '{"t":"BMW R 1200 GS Adventure 42063","no":603,"p":220.5,"e":0.3656716417910448}',
  '{"t":"Telehandler 42061","no":260,"p":99.54,"e":0.3828461538461539}',
  '{"t":"Snowmobile 42021","no":186,"p":77.99,"e":0.41930107526881716}',
  '{"t":"Cherry Picker 42031","no":155,"p":68.83,"e":0.44406451612903225}',
  '{"t":"Police Interceptor 42047","no":185,"p":82.83,"e":0.44772972972972974}',
  '{"t":"Compact Tracked Loader 42032","no":145,"p":73.99,"e":0.5102758620689655}',
  '{"t":"App Controlled Top Gear Rally Car 42109","no":463,"p":236.5,"e":0.5107991360691144}',
  '{"t":"Buggy 42101","no":117,"p":66.24,"e":0.5661538461538461}',
  '{"t":"Quad Bike 42034","no":148,"p":87.5,"e":0.5912162162162162}',
  '{"t":"Record Breaker 42033","no":125,"p":78.5,"e":0.628}',
  '{"t":"Off-road Racer 42010","no":160,"p":112.7,"e":0.704375}',
  '{"t":"Desert Racer 42027","no":149,"p":123,"e":0.825503355704698}',
  '{"t":"Twin-rotor Helicopter 42020","no":145,"p":135,"e":0.9310344827586207}',
  '{"t":"Black Champion Racer 42026","no":138,"p":153.9,"e":1.115217391304348}',
  '{"t":"XL Motor Powered Up 88014","no":1,"p":20.99,"e":20.99}',
  '{"t":"Power Functions L Motor 88003","no":1,"p":27.9,"e":27.9}',
  '{"t":"Powered Up Large Motor 88013","no":1,"p":29.99,"e":29.99}',
  '{"t":"Power Functions Motor Set 8293","no":10,"p":438,"e":43.8}'
]
