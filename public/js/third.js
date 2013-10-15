
'use strict';
(function(){if(window!=window.top)return;window.Win=window;Win.WD=Win.document;Win.WDL=WD.location;
Win.eUC=encodeURIComponent;Win.dUC=decodeURIComponent;
Win.Fun=function(f,r){return Function('a','b','c','d','e','f','g',(r===1?'return ':'')+(f||'false').toString())};
Win.dge=Fun("WD.getElementById(a)",1);
Win.inAr=Fun("e=b.length;while(e--)if(a==b[e]){if(c===false)b.splice(e,1);return e+1}if(c===true)b.push(a);return 0");
if(!Win.jss)Win.jss={};
if(1){
	var host=WDL.href.split('//')[1].split('/')[0],path=WDL.pathname,r,myStage='www',myDomain='',myTLC='';
	if(!host.indexOf('ref.')){
		myStage='ref';
		if((r=/([\w\-]+\.(com|net|co\.uk))$/i.exec(host)))myDomain=r[1];
	}else if((r=/^(\w\w|dev)\./i.exec(host))){		 myStage='dev';myTLC=r[1];
		 if(myTLC=='dev'){$myTLC='';if((r=/([\w\-]+\.(com|net|co\.uk))$/i.exec(host)))myDomain=r[1]}
	}else if((r=/([\w\-]+\.(com|net|co\.uk))$/i.exec(host)))
		 myDomain=r[1];
	jss.log=function(a){if(Win.console)console.log('> '+a);return a}, 	jss.env={domain:'www.jobsite.co.uk',
		protocol:WDL.protocol=='https:'?'https:':'http:',stage:myStage,tlc:'UK'.toLowerCase()
	};
	if(!jss.env.domain.indexOf('ref.'))jss.env.stage='ref';else if(/^(\w\w|dev)\./.test(jss.env.domain))jss.env.stage='dev';else jss.env.stage='www';
}
jss.addScript=function(a,b,c,s){	if('https:'==jss.env.protocol&&!((a||'').indexOf('http:')))return false;
	s=WD.createElement('script'); // s.type='text/javascript';s.charset='utf-8';
	var async=c&&c!=2&&a;if(async)s.async=true,s.defer=true;else if(s.async)s.async=false;
	if(!a)s.text=b;else{
		jss.log('+ '+a);
		if(!a.indexOf('/'+'/'))a=jss.env.protocol+a;s.src=a;if(b)s.id=b
	}if((c!=2||!a)&&WD.body)WD.body.appendChild(s);
	else WD.getElementsByTagName('head')[0].appendChild(s);
	return true
};

jss.addPixel=function(a,b,c,s){	if('https:'==jss.env.protocol&&!((a||'').indexOf('http:')))return false;
	s=WD.createElement(b?'iframe':'img');jss.log((WD.body?'* ':'! ')+a);
	s.width=1;s.height=1;s.style.border='0';s.style.width=s.style.height='1px';s.alt='';
	if(!a.indexOf('/'+'/'))a=jss.env.protocol+a;s.src=a;
	if(WD.body)WD.body.appendChild(s);
};

jss.browser={mobile:+'0',agent:navigator.userAgent.toLowerCase()};
jss.third={
	env:{},
	mobiletrack:'1',
	events:{
		head:['gooanalstart','maxymiser'],
		anypage:'gooanal	ignite	millenialmedia	r1r4conv	goopubtag	salescon	struq	ajl	affectv	revsci	lotame	metro	addthis'.split('	'),
		jpq2:'dwin	webtrends	dcspot'.split('	')
	},	meth:{},done:{},
	setup:function(obj){
		var t=jss.third,e=t.events,x=['head','anypage','jpq2'],i=0;
		for(;i<x.length;i++)if(obj[x[i]]){
			jss.log('3rd: '+x[i]);
			for(var j=0;j<e[x[i]].length;j++)
				if(e[x[i]][j]&&!t.done[e[x[i]][j]])
					t.done[e[x[i]][j]]=true,
					jss.log('   :'+e[x[i]][j]+'='+t.meth[e[x[i]][j]](obj));
				else
					jss.log('   : skip '+e[x[i]][j])
		}
	},
	envMod:function(obj){
		var meth=obj.meth;delete obj.meth;
		for(var i in obj)jss.third.env[i]=obj[i];
		if(meth&&jss.third.meth[meth])jss.third.meth[meth](obj);
	},
	
	enable:function(obj){		if(obj.id && obj.url && Win.$)
			$(obj.id).click(function(){_gaq.push(['_trackPageview',obj.url])});
		if(obj.display && Win.googletag)
			googletag.cmd.push(function(){googletag.display(obj.display)});
	}
};

jss.third.meth.addthis=function(obj){	if(jss.env.tlc!='uk'||WDL.pathname.indexOf('/worklife/'))return false;
	Win.addthis_config={ pubid: 'jobsiteuk', data_ga_property: jss.third.env.gooanalid, data_ga_social:true };
	return jss.addScript('//s7.addthis.com/js/250/addthis_widget.js');
};
		
jss.third.meth.revsci=function(obj){
	var csid='',c=jss.env.tlc;
	if(c=='uk'||c=='lm'||c.charAt(0)=='t')csid='D05509';
	if(c=='jp'||c=='q2')csid='D08737';
	if(csid)return jss.addScript('//js.revsci.net/gateway/gw.js?csid='+csid);
	else return false;
};

jss.third.meth.dcspot=function(obj){	return false;};

jss.third.meth.widgetserver=function(obj){	jss.addScript('//cdn.widgetserver.com/syndication/subscriber/InsertWidget.js',0,2)
	if(Win.WIDGETBOX)WIDGETBOX.renderWidget('060a5d72-4f8c-49aa-834e-f0fb561c67fd');
	return !!Win.WIDGETBOX
};

jss.third.meth.metro=function(obj){	return false;};

jss.third.meth.millenialmedia=function(obj){
	
	
	if(jss.browser.mobile){
		jss.addPixel('https://secure.tracker.blismobile.com/source/jobsite/event/landing/')
		var mmmtid=((WDL.search||'').split('mm_urid=')[1]||'').split('&')[0];
		if(mmmtid)jss.addPixel('http://cvt.mydas.mobi/handleConversion?goalid=22428&urid='+mmmtid+'&timestamp='+~~(+new Date*.001));
		return true
	}return false
	
}

jss.third.meth.maxymiser=function(obj){	var blogStage=jss.env.stage;if(jss.env.stage=='www')blogStage='';		if(Win.mmcore||jss.env.tlc!='uk')return false;
		WD.write('<scr'+'ipt src="//service.maxymiser.net/cdn/jobsite/js/mmcore.js"></scr'+'ipt>');		return true;	return false
};

jss.third.meth.r1r4conv=function(obj){	var gcon={
		r1:{id:'1069819849',label:'pRgnCI34iAMQyc-Q_gM',color:'ffffff'},
		r4:{id:'987704218',label:'6iioCP67-QUQmtf81gM',color:'ffffff'},
		cj:{id:'1071714857',label:'DCWCCLe6hQIQqaSE_wM',color:'666666'}
	},
		gc=gcon[jss.env.tlc],s=jss.third.env.state||{};
	if(gc&&s.in_page=='apply'){
		Win.google_conversion_id=gc.id;Win.google_conversion_label=gc.label;Win.google_conversion_color=gc.color;
		Win.google_conversion_language="en";Win.google_conversion_format="3";Win.google_conversion_value=0;
		jss.addScript('https://www.googleadservices.com/pagead/conversion.js',0,1);
		Win.indeed_conversion_id='7924303289985284';Win.indeed_conversion_label='';
		return jss.addScript('//conv.indeed.com/pagead/conversion.js',0,1)
	}return false};

jss.third.meth.gooanalstart=function(obj){	var je=jss.third.env;
	je.includeGA=true;
	je.gooanalid='UA-360555-1';
	je.gooanalmobileid='UA-360555-23';
	je.gooanal2ndid='';
		if(host.indexOf('jobstoday.co.uk')!=-1 && !path.indexOf("/cgi-bin/vacancy_group_manager.cgi")){  
		jss.log('Excluded '+path+' from Google Analytics');
		je.includeGA=0;
	}
	if( path.indexOf("ops_worldpay_auth_callback.cgi")!=-1 
		|| path.indexOf('disqus-comment-system/xd_receiver.htm')!=-1
		|| path.indexOf("/cgi-bin/xposted_vac_details.cgi")!=-1 
		|| path.indexOf("/cgi-bin/cvsearch.cgi")!=-1 
		|| path.indexOf("/insider/wp-content/plugins/disqus-comment-system/xd_receiver.htm?fb_xd_fragment=")!=-1 
	){
		je.includeGA=0;
	}else if( host.indexOf("cstools")!=-1 || host.indexOf("workflow")!=-1 ){
		je.includeGA=0;
	}
	if(je.includeGA&&!Win._gaq)Win._gaq=[];
	return !!je.includeGA;
};

jss.third.meth.gooanal=function(obj){
	var je=jss.third.env, mob=jss.browser.mobile,	mobBit=mob ? undefined : true;
	if(!je.includeGA)return false;
	var uacct=je.gooanalid, uacct2=je.gooanal2ndid;
	if(mob){
		uacct=je.gooanalmobileid, uacct2=je.gooanalid
	}
	var googvars=je.state||{}, googEv=je.event||{};
	if( host=='euromoneyiijobs.com' )
		_gaq.push(['_setDomainName', 'none']),
		_gaq.push(['_setAllowLinker', true]);
	if(uacct2)
		_gaq.push(['jobsite._setAccount',uacct2]);

	if(jss.env.tld=='lm'){
		_gaq.push(['_setCampSourceKey', 'ito']);
		_gaq.push(['_setAllowLinker', true]);
		_gaq.push(['jobsite._setAccount',uacct]);
		_gaq.push(['jobsite._trackPageview']);
		_gaq.push(['jobsite._trackPageLoadTime']);
	}else{
		_gaq.push(['_setAccount',uacct]);
		if(jss.env.tld=='em'){
			_gaq.push(['_setDomainName', 'none']);
			_gaq.push(['_setAllowLinker', true]);
		}
		_gaq.push(['_trackPageLoadTime']);
	}
	if(googvars.canonical_url)
		_gaq.push(['_trackPageview',googvars.canonical_url]);
	else 
		_gaq.push(['_trackPageview']);
	
	if( !uacct2 && host.indexOf('recoblog.js.weboperations.co.uk')!=-1 )uacct2 = 'UA-26887328-1';
  if(uacct2){
		_gaq.push(['t2._setAccount',uacct2]);
		_gaq.push(['t2._trackPageview']);
		_gaq.push(['t2._trackPageLoadTime']);
	}
	_gaq.push(['_setAccount',uacct]);
		if(googvars.registered)
		_gaq.push(['_setCustomVar', 1, 'Registered', googvars.registered, 1]);
	if(googvars.loginstatus=='LoggedIn'){
		_gaq.push(['_setCustomVar', 2, 'LoginStatus', googvars.loginstatus, 2]);
		if(googvars.cvuploaded=='CVUploaded')
			_gaq.push(['_setCustomVar', 3, 'CVuploaded', googvars.cvuploaded, 1]);     
	}
	if(googEv.search){
		_gaq.push(['_setCustomVar', 5, 'NumberOfResults', googvars.total_hits, 3]);
		_gaq.push(['_trackEvent', 'Search', googvars.search_page, undefined, undefined, mobBit]);
		if(googvars.results_creation_date)
			_gaq.push(['_setCustomVar', 4, 'ResultsCreationDate', googvars.results_creation_date, 3]);
	}
	if(googvars.vacexpired)
		_gaq.push(['_setCustomVar', 5, 'VacancyExpired',googvars.vacexpired, 3]);
	
	var ti=0,randi=function(){return Math.round(Math.random()*10000000)},
		gsw='http://rs.gwallet.com/r1/pixel/';
	if(googEv.vacview)
		_gaq.push(['_trackEvent', 'VacancyView',googvars.vacview, mob?undefined:googvars.salary]);
	if(googEv.jbe){
		_gaq.push(['_trackEvent', 'Conversion', 'JBE','JBEcount',googvars.jbe_count]);
		if(mob)jss.addPixel(gsw+'x1155'+randi())
	}
	if(googEv.registration){
		_gaq.push(['_trackEvent', 'Conversion',googvars.registration_step, undefined, undefined, mobBit]);
		if(googEv.registration == 'Registration')if(mob)jss.addPixel(gsw+'x1154'+randi())
	}
	if(googEv.upcv){
		_gaq.push(['_trackEvent', 'Conversion', 'UploadCV', undefined, undefined, mobBit]);
		if(mob)jss.addPixel(gsw+'x1152'+randi())
	}
	if(googEv.apply){
		_gaq.push(['_trackEvent', 'Conversion', 'Application', googvars.salary, undefined, mobBit]);
		if(mob)jss.addPixel(gsw+'x1151'+randi())
	}
	if(googEv.applyext)
		_gaq.push(['_trackEvent', 'Conversion', 'Application', 'External', 1]);
	if(googEv.shortlist)
		_gaq.push(['_trackEvent', 'Conversion', 'Shortlist', undefined, undefined, mobBit]);
	if(googEv.emailfriend)
		_gaq.push(['_trackEvent', 'Conversion', 'EmailFriend', undefined, undefined, mobBit]);
	if(googEv.upcvsearch){
		_gaq.push(['_trackEvent', 'Conversion', 'UploadCVSearchable', undefined, undefined, mobBit]);
		if(mob)jss.addPixel(gsw+'x1157'+randi())
	}
	if(googEv.upcvunsearch)
		_gaq.push(['_trackEvent', 'Conversion', 'UploadCVUnSearchable', undefined, undefined, mobBit]);
	
	if(je.goals&&je.goals.length)
		for(ti=0;ti<je.goals.length;ti++){
			_gaq.push(['_trackPageview','/'+je.goals[ti]]);
			if(uacct2)
				_gaq.push(['t2._trackPageview','/'+je.goals[ti]]);
		}	return jss.addScript(('https:'==WDL.protocol?'https://ssl':'http://www')+'.google-analytics.com/ga.js',0,2)};

jss.third.meth.struq=function(obj){	var sqs={'application':'q2CgxutLlkWDfK038j0FyQ','conversion':'bzWK9utIA0OPafdCeWNc9g','cvupload':'iHayfBoELkmDPvo3N54edw','homepage':'bTIb4s0PMUWfSaMCMMURoQ','joblist':'nigWjFFRRUOO3tA2Wqb98w','jobtitle':'ESGEEHD0vE6_vgzqpTKDBQ','multijob':'pDEQ84akOUOUSg3K_wgeog','ovpconfirm':'wy9Ih9lzpUCtl3JZhcDlDw','ovpcvsearch':'qf9GVmGMN0WAVPwIsLEgEg','ovphome':'lDpQRK2gzkOcfyIEMUfRpA','ovpvacpost':'cX2NQNXvjke1UHlNM-NrJw','registration':'UKPp9vcpa0CEYFwoBrZE9w','shortlist':'C5vipLAykkWAtC71aoVO2g'
	},area, page=(jss.third.env.state||{}).in_page, evnt=jss.third.env.event||{},
		endURL=WDL.href.split('//')[1].split('#')[0];
	endURL=endURL.substr(endURL.indexOf('/'),endURL.length);
	if(endURL.split('?')[0]=='/')area='homepage';
	else if(page=='searchresults')area='search';
	else if(page=='ovp')area='conversion';
	else if(evnt.apply||evnt.applyext)area='application';
	else if(evnt.registration)area='registration';
	else if(evnt.upcv)area='cvupload';
	else if(endURL.indexOf('/jobs/')!=-1)area='jobtitle';
	else if(endURL.indexOf('purchase_confirm')!=-1)area='ovpconfirm';
	else if(jss.env.tlc=='uk'&&(evnt=jss.third.env.basket)){
		if(evnt.cv&&evnt.cv.quantity)area='ovpcvsearch';
		if(evnt.vacancy&&evnt.vacancy.quantity)area='ovpvacpost';
		if(evnt.special)area='multijob';
	}else if(endURL.indexOf('product')!=-1)area='product';
	if(!area||!sqs[area]){
		jss.log('!strq: '+area);return false;
	}
	jss.log('      Struq:'+area);
	var surl,rnd=parseInt(Math.random()*1e16);
	if(area=='search'||area=='product'&&Win.$){
		var slc=[];
		$('.struq_SL_DF_container').each(function() {
			var items = []; var ckey = $(this).attr('title');
			$(this).find('.struq_SL_DF').each(function(){
				var pn=$(this).attr('title'),pv=$(this).text();
				items[items.length]=eUC(pn)+'='+eUC(pv);
			});
			slc[slc.length]=ckey+'='+(items.join('|'));
		});
		if(slc.length==0)return;
		surl='//app.struq.com/s/s/'+sqs[area]+'/?v=2&qs='+eUC(slc.join('&'))+'&rnd='+rnd;
	}else{
		surl='//app.struq.com/s/g/'+sqs[area]+'/?v=2&qs='+area+'&rnd='+rnd;
	}
	jss.addPixel(surl,'iframe')
	return jss.addScript('/js/struq_sl_jquery.js')};

jss.third.meth.salescon=function(obj){
	if(jss.env.tlc!='uk'||WDL.href.indexOf('purchase_confirm')==-1)return false;
	var c='google_conversion_';
	Win[c+'id']=1008015111;Win[c+'language']="en";Win[c+'format']="3";Win[c+'color']="ffffff";
	Win[c+'label']="V5uECLmR4gIQh67U4AM";Win[c+'value']=99;
	return jss.addScript('https://www.googleadservices.com/pagead/conversion.js')
};

jss.third.meth.ajl=function(obj){	if(jss.env.tlc=='yj'&&!Win.ns_loadingtime2){
		jss.addScript('/js/nedstat-code.js',0,1);jss.addScript('/js/sitestat.js',0,1);
		return jss.addScript(0,'Win.ns_loadingtime2=(new Date()).getTime();')
	}
	return false;
};

jss.third.meth.ignite=function(obj){	
	if(jss.browser.mobile){
		var mobtrk = jss.third.env.mobile_tracking;
		if(mobtrk)for(var mi=0;mi<mobtrk.length;mi++){
			var pairs=[];
			for(var mx=0;mx<mobtrk[mi].params.length;mx++)
				for(var my in mobtrk[mi].params[mx])
					pairs.push(['&',my,'=',mobtrk[mi].params[mx][my]].join(''));
			var mt=['https://track.searchignite.com/si/CM/Tracking/TransactionTracking.aspx?siclientid=',
				mobtrk[mi].client_id||'',
				'&transactionamount=0&SICustTransType=',mobtrk[mi].event_id||'',
				'&jscript=0',pairs.join('')
			].join('');
			jss.addPixel(mt);
		}
	}	var ignite='5424';
	jss.third.si_tracking=function(uid,am,tid,si_data){
		var dat='',i=0;for(;i<si_data.length;i++)dat+='&'+si_data[i][0]+'='+escape(si_data[i][1]);
		var src = WDL.protocol+'//track.searchignite.com/si/CM/Tracking/TransactionTracking.aspx?siclientid=5424'+'&DetailDescription='+escape(uid)+'&TransactionAmount='
			+am+'&SICustTransType='+tid+dat+'&timecode='+(new Date()).getTime()+'&jscript=1';
		jss.addScript(src,0,2);
	};
	if(ignite){
		var sia=jss.third.si_arr;
		jss.addScript('//track.searchignite.com/si/CM/Tracking/ClickTracking.aspx?siclientid='+ignite+'&jscript=1',0,1);
		if(sia)for(var i=0;i<sia.length;i++)jss.third.si_tracking.apply(this,sia[i]);
		return true;
	}
	return false;};

jss.third.meth.lotame=function(obj){	if(jss.env.tlc=='uk'||jss.env.tlc =='lj')if('http:'==jss.env.protocol){
		jss.addScript('//tags.crwdcntrl.net/c/991/cc.js?ns=_cc991','LOTCC_991');
		jss.addScript(0,'setTimeout("if(Win._cc991)_cc991.bcp()",333);');
		// WD.write('<scr'+'ipt src="//ad.crwdcntrl.net/5/c=991/pe=y/var=ccauds"></scr'+'ipt>');
		return true;
	}
	return false;};

jss.third.meth.affectv=function(obj){	if(jss.env.tlc!='uk')return false;
	var r,afctv='',s=jss.third.env.state||{};
	if(s.in_page=='apply')
		afctv='con';
	else if(WDL.href.indexOf('myjobsite.cgi')!=-1||WDL.href.indexOf('applynow.cgi')!=-1)
		afctv='reg';
	else if(WDL.href.indexOf('myjobsite_cv_management.cgi')!=-1&&(
		WDL.search.indexOf('form_action=display_new_cv')!=-1||WDL.search.indexOf('from=applynow')!=-1
	))
		afctv='cv';
	else if(s.ad_zone)
		afctv=s.ad_zone;
	else if((r=/jobs\/(\w+)/.exec(WDL.href)))
		afctv=r[1];
	if(afctv){
		afctv={con:'522463c6c25908038ae78336',
			reg:'504f2e5cb0b611339c1f7992',
			cv:'504f2e5cb0b611339c1f7993',
			it:'504f2e5cb0b611339c1f7995',
			engineering:'504f2e5cb0b611339c1f7996',
			sales:'504f2e5cb0b611339c1f7997',
			manufacturing:'504f2e5cb0b611339c1f7998',
			construction:'504f2e5cb0b611339c1f7999',
			banking:'504f2e5cb0b611339c1f799a'
		}[afctv];
		if(!afctv)return false;
		r=WD.createElement('img');r.height=r.width=1;r.src='//go.affec.tv/i/'+afctv;r.style.display='none';
		if(WD.body)WD.body.appendChild(r);
	}
	return true;};

jss.third.meth.goopubtag=function(obj){	if('https:'==jss.env.protocol)return false;
	return false;
	if(Win.dartSiteId||jss.env.tlc=='q2'||jss.env.tlc=='jp')return false;
	var ci='consultant_identity',ck=WD.cookie;if(ck.indexOf(ci+'=logged_off')==-1)if(ck.indexOf(ci)!=-1){		var ic='advsearch advancedse jobs/ job/ social-m faq/'.split(' '),i=ic.length,stop=1;while(i--)if(path.indexOf(ic[i])!=-1)stop=0;
		if(path!='/'&&stop)return false;
	}	if(!Win.googletag)Win.googletag={};googletag.cmd=googletag.cmd||[];
	if(obj.display) // display = div id, eg div-gpt-ad-123456789-1
		return googletag.cmd.push(function(){googletag.display(obj.display)});
	var sb=dge('sideBanner'),hb=dge('headerBanner'),tb=dge('topBanner'),lb=dge('smallBanner'),qb=dge('squareBanner'),
	 	gT=Fun("a&&(/\\w/.test((a.textContent||a.innerText).split('\\n').join('')))",1);
	if(gT(hb)||gT(sb)||gT(qb))return jss.log(' got ad.'),false;
	jss.addScript('//www.googletagservices.com/tag/js/gpt.js',0,2);
	var slot="jobsite.uk"||"jobsite.uk",
		mynum='div-gpt-ad-1362569475663';
	if(!slot)slot=WDL.href.split('//')[1].split('/')[0].replace(/co\.uk/,'uk');
	var jp="",
		ai=""||(jss.third.env.state||{}).ad_zone;
	if(!ai)ai=path=='/'?'homepage':'default';
	slot+='/'+(jp?jp+'/':'')+ai;
	googletag.cmd.push(function(){ googletag.pubads().set("adsense_background_color", "FFFFFF"); });
	googletag.cmd.push(function(){		googletag.defineSlot('/5765/'+slot, [[728, 90],[468, 60],[380, 60]], mynum+'-0').addService(googletag.pubads());
		googletag.defineSlot('/5765/'+slot, [[120, 600]], mynum+'-1').addService(googletag.pubads());
		googletag.defineSlot('/5765/'+slot, [[300, 250]], mynum+'-2').addService(googletag.pubads());
		googletag.defineSlot('/5765/'+slot, [[468, 60],[380, 60]], mynum+'-3').addService(googletag.pubads());
		googletag.defineSlot('/5765/'+slot, [[380, 60]], mynum+'-4').addService(googletag.pubads());
		googletag.pubads().setTargeting("topic","recruitment");
		googletag.pubads().enableSingleRequest();googletag.enableServices();
	});
	// todo: topBanner, campaignBanner, flashBanner, resultsBanner
	if(hb){
		hb.innerHTML=('<div id="'+mynum+'-0"></div>');googletag.cmd.push(function(){googletag.display(''+mynum+'-0')});
	}if(tb){
		tb.innerHTML=('<div id="'+mynum+'-3"></div>');googletag.cmd.push(function(){googletag.display(mynum+'-3')});
	}if(lb){
		lb.innerHTML=('<div id="'+mynum+'-4"></div>');googletag.cmd.push(function(){googletag.display(mynum+'-4')});
	}
	if(sb){if(((sb.firstChild||{}).className||'')!='b-ri')
		sb.innerHTML=('<div id="'+mynum+'-1"></div>'),googletag.cmd.push(function(){googletag.display(mynum+'-1')});
	}
	if(qb){qb.innerHTML=('<div id="'+mynum+'-2"></div>');googletag.cmd.push(function(){googletag.display(mynum+'-2')});}
	return true;};

jss.third.meth.ovp=function(obj){	if(Win._gaq&&jss.third.env.gooanalid&&jss.third.env.basket){
		var currency=function(a,b){b=''+Math.round((a%1)*100);while(b.length<2)b+='0';return~~a+'.'+b.substr(0,2)};
		var scc='UK',
			basket=jss.third.env.basket,tid=basket.state.transaction_id;
		_gaq.push(['_setAccount',jss.third.env.gooanalid]);
		_gaq.push(['_trackPageview']);
		_gaq.push(['_addTrans',scc+tid,scc,currency(basket.total_price)]);
		if(basket.vacancy)_gaq.push(['_addItem',scc+tid,
			basket.vacancy.details.service_id+basket.vacancy.details.quantity,
			basket.vacancy.details.description+' x '+basket.vacancy.details.quantity,
			basket.vacancy.service_type,
			currency(basket.vacancy.details.total_discounted_price),
			'1'
		]);
		if(basket.cvm)_gaq.push(['_addItem',scc+tid,
			basket.cvm.details.service_id+basket.cvm.details.quantity,
			basket.cvm.details.description+' x '+basket.cvm.details.quantity,
			basket.cvm.service_type,
			currency(basket.cvm.details.total_discounted_price),
			'1'
		]);
		if(basket.cv)_gaq.push(['_addItem',scc+tid,
			basket.cv.details.service_id+basket.cv.details.quantity,
			basket.cv.details.description+' x '+basket.cv.details.quantity,
			basket.cv.service_type,
			currency(basket.cv.details.total_discounted_price),
			'1'
		]);
		if(basket.special)for(var offer in basket.special)_gaq.push(['_addItem',scc+tid,
			basket.special[offer].value.details.service_id+basket.special[offer].value.details.quantity,
			basket.special[offer].value.details.title+' x '+basket.special[offer].value.details.quantity,
			basket.special[offer].value.service_type,
			currency(basket.special[offer].value.details.total_discounted_price),
			'1'
		]);
		_gaq.push(['_trackTrans']);
	}
};

jss.third.meth.webtrends=function(obj){	jss.addScript('/js/wt_capi.js',0,1);	Win.webtrendsAsyncInit = function(){
		var dcs=new Webtrends.dcs().init({
			dcsid:"dcshif7kj00000o61o4kdbjkp_6b2k",	domain:'statse.webtrendslive.com',
			fpcdom:jss.env.tlc=='q2'?'.scotsman.com':'.jobstoday.co.uk',
			timezone:0, enabled:true, i18n:false,
			fpc:"WT_FPC", paidsearchparams:"gclid", splitvalue:"", preserve:false
		});
		dcs.DCSext.ssite="";
		dcs.DCSext.sdomain="";
		// dcs.dcsCollect();
		dcs.track();
	};
	return jss.addScript('/js/webtrends'+(jss.browser.mobile?'.lite':'')+'.min.js',0,1)
};

jss.third.meth.dwin=function(obj){	jss.addScript('https://www.dwin1.com/4902.js');
	var b=jss.third.env.basket;
	if(!b||WDL.href.indexOf('purchase_confirm')==-1)return true;
	var SALE_AMOUNT=b.state.total_price,
		ORDER_REF=b.state.transaction_id,VOUCHER_CODE='',COMMISSION_GROUP='default',
		PRODUCT_NAME=eUC(b.vacancy.description),PRODUCT_ID='OVP',UNIT_PRICE=SALE_AMOUNT,QUANTITY=b.vacancy.quantity,CATEGORY='';
	jss.addPixel('https://www.awin1.com/sread.img?tt=ns&amp;tv=2&amp;merchant=4902&amp;amount='+SALE_AMOUNT+'&amp;ref='+ORDER_REF+'&amp;parts='+COMMISSION_GROUP+':'+SALE_AMOUNT+'&amp;vc='+VOUCHER_CODE+'&amp;testmode=0&amp;cr=GBP')
	var dwinf=WD.createElement('form');dwinf.name=dwinf.id='aw_basket_form'; dwinf.style.display='none';
	var ats='AWIN.Tracking.Sale',
		line='AW:P|4902|'+ORDER_REF+'|'+PRODUCT_ID+'|'+PRODUCT_NAME+'|'+UNIT_PRICE+'|'+QUANTITY+'|'+COMMISSION_GROUP+'|'+CATEGORY;
	dwinf.innerHTML='<textarea wrap="physical" id="aw_basket">\n'+line+line+line+'\n</textarea>';
	if(WD.body)WD.body.appendChild(dwinf);else jss.log('dwin error');
	jss.addScript(0,"if(!Win.AWIN){Win.AWIN={};AWIN.Tracking={};"+ats+"={};"
		+ats+".amount = '"+SALE_AMOUNT+"';"+ats+".currency = 'GBP';"+ats+".orderRef = '"+ORDER_REF+"';"
    +ats+".parts = '"+COMMISSION_GROUP+":"+SALE_AMOUNT+"';"+ats+".voucher = '"+VOUCHER_CODE+"';"
    +ats+".test = '"+(jss.env.stage=='www'?0:1)+"';}");
	return jss.addScript('https://www.dwin1.com/4902.js',0,1)
};jss.third.getSet=function(a){
	clearTimeout(jss.third.tov);a=WD.readyState;
	if(a=='complete'||a=='loaded')jss.third.setup({anypage:true,jpq2:(jss.env.tlc=='jp'||jss.env.tlc=='q2')});
	else if(a)jss.third.tov=setTimeout(jss.third.getSet,333);
};
jss.third.setup({head:true});
jss.third.getSet();
})();
