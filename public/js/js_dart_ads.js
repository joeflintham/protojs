// #@(#)js_dart_ads.js	1.10 18:45:47,13/05/13 (yy/mm/dd)
// mark.kennard, jc

	var adverts = (function(){
	var ord=Math.random()*10000000000000000,
		tile=1;

	var rsi_segs = [];
	var segs_beg=document.cookie.indexOf('rsi_segs=');
	if(segs_beg>=0){
		segs_beg=document.cookie.indexOf('=',segs_beg)+1;
	if(segs_beg>0){
		var segs_end=document.cookie.indexOf(';',segs_beg);
		if(segs_end==-1)segs_end=document.cookie.length;
			rsi_segs=document.cookie.substring(segs_beg,segs_end).split('|');
		}
	}
	var segQS = rsi_segs.length> 0 ? ";rsi=" + rsi_segs[0] +";" : "";
	for (var i = 1; i <rsi_segs.length && i <20; i++) {
		segQS += ("rsi" + "=" + rsi_segs[i] + ";");
	}	
	// render inline DART tags
	var runDart = function(ad){
		var adZone = document.location.protocol + "//ad.uk.doubleclick.net/N5765/adj/"+dartSiteId+"/"+ad.zone;
    var kw = (document.getElementById('strSearch')) ? escape(document.getElementById('strSearch').value) : "";
		var op='',op2='';
		if(ad.type=="728x90,468x60")op="dcopt=ist;";		
		if(ad.page)op2="pages=" + ad.page + ";";

		// lotame update: 2013-08
		var dartCCKey = "ccaud", dartCC = "";
		if (typeof(ccauds) != 'undefined'){
			for (var cci = 0; cci < ccauds.Profile.Audiences.Audience.length; cci++){
				dartCC += ";"+dartCCKey + "=" + ccauds.Profile.Audiences.Audience[cci].abbr;
			}
		}		
		var scriptBlock = ["<scr","ipt language=\"JavaScript\" src=\"",adZone,";area=",adAreaId,";kw=",kw,";location=",adLocation,";brand=",adBrand,";target=",ad.target,";",op,op2,"tile=",tile,";sz=",ad.type,
			dartCC,
			";ord=",ord,"?",segQS,"\" type=\"text/javascript\"></script>"].join('');
		document.writeln(scriptBlock); 
		tile++;
	};
	return {
		addToArray : function(type, target, zone, page){
			var strOverRide;
			var adZoneIdValue = String(typeof(adZoneId));
			if(enableAds){
				if(zone){
					strOverRide = zone;	
				}else if(adZoneIdValue != "undefined"){
					strOverRide = adZoneId;	
				}else{
					strOverRide = adAreaId;	
				}
				var ad = {
					type:type,
					target:target||'',
					zone: strOverRide,
					area: adAreaId,
					page: page
				}
				runDart(ad);
			}	
		}
	}
})();
