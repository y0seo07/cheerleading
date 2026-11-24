// 기본 모션과 설명
const names = ['하이 V','로우 V','T','클랩'];
const descriptions = ['양팔을 위쪽 대각선으로 뻗어 V자를 만들어요.','양팔을 아래쪽 대각선으로 뻗어요.','양팔을 어깨 높이로 수평하게 뻗어요.','가슴 앞에서 두 손바닥을 맞대요.'];
// SVG 그림: 팔의 위치만 바꾸어 모션을 표현합니다.
function figure(m, costume, pom) {
	let arms = ['M78 80 L42 40 M122 80 L158 40','M78 80 L42 130 M122 80 L158 130','M78 80 L20 80 M122 80 L180 80','M78 80 L72 110 L97 94 M122 80 L128 110 L103 94'][m];
	let color = costume ? '#951a3a' : '#3977cc';
	let trim = costume ? '#d8b56a' : '#ffffff';
	let poms = '';
	if(pom) poms = '<g fill="#79aff4" stroke="#3977cc" stroke-width="3"><circle cx="42" cy="40" r="20"/><circle cx="158" cy="40" r="20"/><path d="M25 40 H59 M42 23 V57 M141 40 H175 M158 23 V57" stroke="white"/></g>';
	return `<svg viewBox="0 0 200 250" role="img" aria-label="${names[m]} 캐릭터"><ellipse cx="100" cy="238" rx="45" ry="6" fill="#cbdff5"/><path d="M73 43 Q60 4 100 5 Q140 4 130 43 L137 91 H63Z" fill="#392d36"/><path d="M85 180 V224 M115 180 V224" stroke="#f0c8ad" stroke-width="16" stroke-linecap="round"/><path d="M75 228 H92 M108 228 H125" stroke="white" stroke-width="13" stroke-linecap="round"/><path d="${arms}" stroke="${costume?'#d6af58':'#f0c8ad'}" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="${arms}" stroke="${costume?'#fff8e8':'#f0c8ad'}" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M77 72 H123 L120 135 H80Z" fill="${color}" stroke="${trim}" stroke-width="3"/><path d="M80 135 H120 L145 194 Q100 205 55 194Z" fill="${color}" stroke="${trim}" stroke-width="3"/><path d="M58 190 Q100 201 142 190" stroke="${trim}" stroke-width="9" fill="none"/><path d="M88 140 L78 184 M112 140 L122 184" stroke="${trim}" opacity=".7" stroke-width="2"/><path d="M84 78 L100 96 L116 78 M100 97 V132" stroke="${trim}" stroke-width="4" fill="none"/>${costume?'<path d="M90 69 H110 L120 84 H80Z M88 83 H112 L123 96 H77Z M86 95 H114 L125 108 H75Z" fill="#fffdf5" stroke="#d8b56a"/><path d="M83 112 Q95 105 88 126 M117 112 Q105 105 112 126 M73 163 Q90 150 81 177 M127 163 Q110 150 119 177" fill="none" stroke="#d8b56a" stroke-width="3"/>':'<text x="100" y="118" text-anchor="middle" fill="white" font-size="11">PLAY</text>'}<ellipse cx="100" cy="42" rx="28" ry="30" fill="#f4ceb6"/><path d="M72 38 Q65 5 100 8 Q135 5 128 38 Q111 31 102 19 Q90 34 72 38" fill="#392d36"/><ellipse cx="90" cy="43" rx="3" ry="4" fill="#392d36"/><ellipse cx="110" cy="43" rx="3" ry="4" fill="#392d36"/><ellipse cx="83" cy="51" rx="5" ry="3" fill="#efa5aa"/><ellipse cx="117" cy="51" rx="5" ry="3" fill="#efa5aa"/><path d="M95 53 Q100 60 105 53" stroke="#a95959" stroke-width="2" fill="none"/>${poms}</svg>`;
}
// 메가폰을 클릭할 때마다 메뉴를 열거나 닫습니다.
function showMenu() {
	let line = document.querySelector('.menuLine');
	let opened = line.classList.toggle('opened');
	document.getElementById('start').setAttribute('aria-expanded', String(opened));
	document.getElementById('menu').inert = !opened;
}
function showMotion(i) {
	document.getElementById('actionFigure').innerHTML=figure(i,true,false);
	document.getElementById('motionName').textContent=names[i];
	document.getElementById('motionInfo').textContent=descriptions[i];
}
// 액션 소개 페이지에서만 실행
if (document.getElementById('actionFigure')) {
	for(let i=0;i<4;i++) {
		let b=document.createElement('button');
		b.textContent=names[i];
		b.onclick=function() {
			showMotion(i);
		};
		document.getElementById('motionButtons').appendChild(b);
	}
	showMotion(0);
}
// 균형 게임과 게임 선택 화면의 캐릭터
if (document.getElementById('tilt')) document.getElementById('tilt').innerHTML=figure(0,false,false);
if (document.getElementById('choiceAction')) {
	document.getElementById('choiceAction').innerHTML=figure(0,true,false);
	document.getElementById('choiceStunt').innerHTML=figure(0,false,true);
}
function roleInfo(i) {
	document.getElementById('roleInfo').textContent=['플라이어 (Flyer): 위에서 균형과 자세를 유지하며 동작을 표현하는 역할.','베이스 (Base): 아래에서 플라이어를 지지하는 역할.','백스팟 (Back Spot): 뒤에서 플라이어의 안정과 안전을 돕는 역할.'][i];
}
// 스턴트 그림: 위의 플라이어와 아래의 세 선수가 연결된 모습
function athlete(x,y,arms,role) {
	return `<g class="athlete" tabindex="0" role="button" aria-label="${['플라이어','베이스','백스팟'][role]}" onclick="roleInfo(${role})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();roleInfo(${role})}" transform="translate(${x} ${y})"><path d="${arms}" stroke="#edbd9f" stroke-width="13" stroke-linecap="round" fill="none"/><path d="M-12 85 L-16 145 M12 85 L16 145" stroke="#edbd9f" stroke-width="13" stroke-linecap="round"/><path d="M-23 146 H-9 M9 146 H23" stroke="white" stroke-width="12" stroke-linecap="round"/><path d="M-20 25 H20 L16 65 L27 90 H-27 L-16 65Z" fill="#3266ad" stroke="#fff" stroke-width="3"/><path d="M-17 30 L0 43 L17 30 M-24 84 H24" stroke="#b8d9ff" stroke-width="4" fill="none"/><circle cy="4" r="21" fill="#efc6aa"/><path d="M-21 4 Q-25 -25 0 -20 Q24 -23 21 4 L0 -10Z" fill="#44343b"/><circle cx="-7" cy="5" r="2"/><circle cx="7" cy="5" r="2"/><path d="M-5 12 Q0 17 5 12" stroke="#a95959" fill="none"/><text y="61" text-anchor="middle" fill="white" font-size="12">PLAY</text></g>`;
}
if (document.getElementById('formation')) {
	document.getElementById('formation').innerHTML='<svg viewBox="0 0 360 390" aria-label="스턴트 포지션 그림">'+athlete(180,222,'M-18 30 L-16 -28 L-16 -55 M18 30 L16 -28 L16 -55',2)+athlete(119,235,'M-18 30 L20 -12 L45 -68 M18 30 L35 -12 L45 -68',1)+athlete(241,235,'M18 30 L-20 -12 L-45 -68 M-18 30 L-35 -12 L-45 -68',1)+athlete(180,20,'M-18 30 L-52 -15 M18 30 L52 -15',0)+'<g fill="#315b96" font-size="15"><text x="245" y="65">플라이어</text><text x="180" y="213" text-anchor="middle">백스팟</text><text x="65" y="380">베이스</text><text x="250" y="380">베이스</text></g></svg>';
}
// 8카운트: 카드 복사 및 교체, 클릭으로도 배치 가능
let moves=Array(8).fill(-1), selected=0, danceTimer=null, music=document.getElementById('music'), musicURL=null, rhythm=0, mode='random', audioContext, sounds=[];
let tempos=[100,120,140];
function drawSlots() {
	let area=document.getElementById('slots');
	area.innerHTML='';
	for(let i=0;i<8;i++) {
		let b=document.createElement('button');
		b.className='slot';
		b.innerHTML='<strong>'+(i+1)+'</strong><span>'+(moves[i]<0?'동작 놓기':names[moves[i]])+'</span>';
		b.onclick=function() {
			assign(i,selected);
		};
		b.ondragover=function(e) {
			e.preventDefault();
		};
		b.ondrop=function(e) {
			e.preventDefault();
			let m=Number(e.dataTransfer.getData('text/plain'));
			if(m>=0&&m<4)assign(i,m);
		};
		area.appendChild(b);
	}
}
function assign(i,m) {
	stopDance();
	moves[i]=m;
	drawSlots();
}
if (document.getElementById('palette')) {
	for(let i=0;i<4;i++) {
		let b=document.createElement('button');
		b.draggable=true;
		b.innerHTML=figure(i,true,false)+names[i];
		b.ondragstart=function(e) {
			e.dataTransfer.setData('text/plain',i);
		};
		b.onclick=function() {
			selected=i;
			for(let card of document.querySelectorAll('#palette button'))card.classList.remove('chosen');
			b.classList.add('chosen');
		};
		document.getElementById('palette').appendChild(b);
	}
	drawSlots();
	document.querySelector('#palette button').classList.add('chosen');
	document.getElementById('composeFigure').innerHTML=figure(0,true,false);
}
function randomMusic() {
	stopDance();
	rhythm=(rhythm+1+Math.floor(Math.random()*2))%3;
	mode='random';
	document.getElementById('bpm').value=tempos[rhythm];
	document.getElementById('musicStatus').textContent='리듬 '+(rhythm+1)+' 선택 완료 ♫';
}
function beat(i) {
	if(!audioContext)return;
	let now=audioContext.currentTime;
	for(let k=0;k<2;k++) {
		let osc=audioContext.createOscillator(),gain=audioContext.createGain();
		osc.type=k===0?'sine':'triangle';
		osc.frequency.value=k===0?(i%2===0?150:95):[ [330,440,392,440],[440,523,392,523],[262,330,392,523] ][rhythm][i%4];
		gain.gain.setValueAtTime(k===0?.16:.07,now);
		gain.gain.exponentialRampToValueAtTime(.001,now+.15);
		osc.connect(gain);
		gain.connect(audioContext.destination);
		osc.start(now);
		osc.stop(now+.16);
		sounds.push(osc);
	}
}
function stopDance() {
	clearInterval(danceTimer);
	danceTimer=null;
	music.pause();
	for(let s of sounds) {
		try {
			s.stop();
		} catch(e) {
		}
	}
	sounds=[];
	for(let b of document.querySelectorAll('.slot'))b.classList.remove('active');
	document.getElementById('count').textContent='READY!';
}
function playDance() {
	stopDance();
	if(moves.includes(-1)) {
		document.getElementById('count').textContent='8개의 동작을 모두 채워 주세요!';
		return;
	}
	let bpm=Math.max(40,Math.min(240,Number(document.getElementById('bpm').value)||120));
	let i=0;
	if(mode==='random') {
		audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();
		audioContext.resume();
	} else {
		music.loop=true;
		music.currentTime=0;
		music.play().catch(function() {
			document.getElementById('musicStatus').textContent='음악 재생 실패: 무음으로 진행합니다.';
		});
	}
	function step() {
		if(i===8) {
			i=0;
		}
		for(let b of document.querySelectorAll('.slot'))b.classList.remove('active');
		document.querySelectorAll('.slot')[i].classList.add('active');
		document.getElementById('composeFigure').innerHTML=figure(moves[i],true,false);
		document.getElementById('count').textContent=(i+1)+' / 8 · '+names[moves[i]];
		if(mode==='random')beat(i);
		i++;
	}
	step();
	danceTimer=setInterval(step,60000/bpm);
}
function resetDance() {
	stopDance();
	moves.fill(-1);
	drawSlots();
	document.getElementById('composeFigure').innerHTML=figure(0,true,false);
}
if (document.getElementById('musicFile')) {
	document.getElementById('musicFile').onchange=function() {
		if(!this.files[0])return;
		stopDance();
		if(musicURL)URL.revokeObjectURL(musicURL);
		musicURL=URL.createObjectURL(this.files[0]);
		music.src=musicURL;
		mode='mp3';
		document.getElementById('musicStatus').textContent=this.files[0].name+' 선택 완료';
	};
}
// 균형 게임: 10도 밖에서는 연속 유지 시간이 0으로 돌아갑니다.
let balanceTimer=null, angle=0, held=0, drift=0, left=false,right=false,last=0;
function stopBalance() {
	clearInterval(balanceTimer);
	balanceTimer=null;
	left=false;
	right=false;
}
function startBalance() {
	stopBalance();
	angle=0;
	held=0;
	drift=0;
	last=performance.now();
	document.getElementById('balanceStatus').textContent='균형을 잡아 주세요!';
	balanceTimer=setInterval(function() {
		let now=performance.now();
		let dt=Math.min((now-last)/1000,.1);
		last=now;
		drift+= (Math.random()-.5)*5;
		drift=Math.max(-18,Math.min(18,drift));
		angle+=(drift+angle*.9+(left?-55:0)+(right?55:0))*dt;
		angle=Math.max(-45,Math.min(45,angle));
		if(Math.abs(angle)<=10)held+=dt;
		else held=0;
		document.getElementById('tilt').style.transform='rotate('+angle+'deg)';
		document.getElementById('angle').textContent=angle.toFixed(1)+'°';
		document.getElementById('progress').value=held;
		document.getElementById('balanceStatus').textContent=Math.abs(angle)>10?'10° 초과! 시간 초기화':held.toFixed(1)+' / 5초';
		if(held>=5) {
			stopBalance();document.getElementById('balanceStatus').textContent='성공! 멋진 백스팟이에요! ✦';
		}
	},40);
}
document.addEventListener('keydown',function(e) {
	if(!balanceTimer)return;
	if(e.key==='ArrowLeft'||e.key==='ArrowRight') {
		e.preventDefault();if(e.key==='ArrowLeft')left=true;
		else right=true;
	}
});
document.addEventListener('keyup',function(e) {
	if(e.key==='ArrowLeft')left=false;
	if(e.key==='ArrowRight')right=false;
});
window.addEventListener('blur',function() {
	left=false;
	right=false;
});
// 다른 HTML 페이지로 이동하면 실행 중인 게임과 영상을 정지합니다.
window.addEventListener('pagehide', function() {
	if (document.getElementById('compose')) stopDance(); if (document.getElementById('balance')) stopBalance(); if (document.getElementById('performance')) document.getElementById('performance').pause();
});
// 뒤로 가기로 메인 화면에 돌아와도 메뉴는 닫힌 상태로 유지합니다.
window.addEventListener('pageshow', function() {
	let line = document.querySelector('.menuLine');
	if (line && line.classList.contains('opened')) showMenu();
});
