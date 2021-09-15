//json 처리 함수 json->obj_list
function jsonProcess(data) {
	const obj_list = [];
	// json 처리
	data["bankList"].forEach(function (item) {
		//obj -> string
		let json = JSON.stringify(item);
		//string화된 obj를 기반으로 객체 생성
		let parsed_obj = JSON.parse(json);
		obj_list.push(parsed_obj);
	});

	return obj_list;
}


//객체 리스트를 날짜별로 묶은 객체 생성
function date_group(obj_list) {
	//reduce(유지값,현재값) => {} - 유지값과 현재값을 가지고 작업 수행
	const date_group_obj = obj_list.reduce((groups, item) => {
		//group을 groups의 index가 가리키는 주소로 지정
		//이미 있다면 빈리스트,아니면 index를 가리키게함
		const group = groups[item.date] || [];

		//group에 요소 추가
		group.push(item);
		//요소가 추가된 group을 실제 groups의 index에 추가
		//각 index로 자동 분류된다
		groups[item.date] = group;
		return groups;
	}, {}); //초기값`{}`

	return date_group_obj;
}

//홈화면 html 요소 생성기
function homeScreenGenerate(date_group_obj) {
	let card_num = 0;

	//초기화
	let date = "";

	/*let today_obj = Date.now();*/
	//json데이터에서 임의로 마지막으로 설정
	let today_obj = new Date("2021-10-03");

	// for(let date_obj of Object.keys(date_group_obj)){
	// 	for(let obj of Object.keys(date_group_obj[date_obj])){
	// 		console.log(date_group_obj[date_obj][obj].classify);
	// 	}
	// }

	Object.keys(date_group_obj).forEach((date_obj) => {
		card_num++;
		let total = 0;

		//expense_info
		$(".expense").append(
			$("<div/>")
			.addClass("expense_info")
			.attr("id", "card" + card_num.toString() + "-info")
		);

		//expense_list
		$(".expense").append(
			$("<ul/>")
			.addClass("expense_list")
			.attr("id", "card" + card_num.toString() + "-list")
		);

		//date 설정
		date = date_obj;
		Object.keys(date_group_obj[date_obj]).forEach((obj) => {

			let date_ob = new Date(date);

			const dayToMS = 86400000;

			let diff = parseInt(((today_obj - date_ob) / dayToMS));

			if (diff == 0) {
				date = "오늘";
			} else if (diff >= 1 && diff <= 3) {
				date = diff + "일전"
			}

			//total 계산, li추가
			let inout = date_group_obj[date_obj][obj].income;

			//span to add
			let $span_item = $("<span/>", {
				class: "item left",
				text: date_group_obj[date_obj][obj].history
			});

			let $span_price = $("<span/>", {
				class: "price right",
				text: inout == "in" ?
					"+ " + date_group_obj[date_obj][obj].price : date_group_obj[date_obj][obj].price
			});

			if (inout == "out") {
				total += parseInt(date_group_obj[date_obj][obj].price);
				$("#card" + card_num.toString() + "-list").append(
					$("<li/>").addClass("content out").append($span_item, $span_price)
				);
			} else {
				$("#card" + card_num.toString() + "-list").append(
					$("<li/>").addClass("content in").append($span_item, $span_price)
				);
			}
		});
		//item
		$("#card" + card_num.toString() + "-info").append(
			$("<span/>").addClass("date left").text(date)
		);
		$("#card" + card_num.toString() + "-info").append(
			$("<span/>").addClass("total right").text(total)
		);
	});
}

//graph value calculation
function expenseGenerate() {

	$.getJSON("https://syoon0624.github.io/json/test.json", function (data) {
		const obj_list = jsonProcess(data);
		const date_group_obj = date_group(obj_list);

		let monthly_category_dict = {
			oiling: 0,
			health: 0,
			eatout: 0,
			shopping: 0,
			mart: 0
		};
		let monthly_expense_dict = {};

		let total = 0;
		let date = "";


		//9월이라 가정함
		//let today_obj = Date.now();
		let today_obj = new Date("2021-09-01");
		let month = today_obj.getMonth();

		for (let date_obj of Object.keys(date_group_obj)) {

			total = 0;

			let date_obj_ = new Date(date_obj);

			if (date_obj_.getMonth() != today_obj.getMonth()) {
				break;
			}

			for (let obj of Object.keys(date_group_obj[date_obj])) {
				//category dict 업데이트
				let type = date_group_obj[date_obj][obj].classify;
				if (date_group_obj[date_obj][obj].income == "out") {
					monthly_category_dict[type] += parseInt(
						date_group_obj[date_obj][obj].price
					);

					//daily total 계산
					total += parseInt(date_group_obj[date_obj][obj].price);
				}
			}

			//day dict 업데이트
			monthly_expense_dict[date_obj_.getDate()] = total;
		}

		color_list = [
			'rgb(255, 99, 132)',
			'rgb(54, 162, 235)',
			'rgb(255, 205, 86)',
			'rgb(80, 205, 86)',
			'rgb(255, 60, 86)'
		];

		monthly_expense_chart_maker(monthly_expense_dict);

		//월 설정하기
		$(".month_pattern > h2").text((month + 1) + " 월 지출 패턴");
		monthly_category_maker(monthly_category_dict, color_list)

		setCategoryTotal(monthly_category_dict, color_list);
	})
}


//daily_chart-bar
function monthly_expense_chart_maker(monthly_expense_dict) {
	const daily_chart = $('.daily');

	const labels = Object.keys(monthly_expense_dict);
	const data_ = Object.values(monthly_expense_dict);

	const data = {
		labels: Object.keys(monthly_expense_dict),
		datasets: [{
			type: 'bar',
			label: '일별 지출',
			data: Object.values(monthly_expense_dict),
			backgroundColor: "#bfff00",
			barPercentage:0.5
		},{
			type: 'line',
			label: '일별 지출',
			data: Object.values(monthly_expense_dict),
			borderColor: "#fff457",
			fill: false,
			borderDash : [3]
		}
	],
	};

	const config = {
		type: 'scatter',
		data: data,
		options: {
		  scales: {
			y: {
			  beginAtZero: true
			}
		  }
		}
	  };

	// const daily_Chart = new Chart(daily_chart, config);
	var mixedChart = new Chart(daily_chart, config);
}



//month_chart-doughnut

function monthly_category_maker(monthly_category_dict, color_list) {
	const month_chart = $('.month');

	const labels = Object.keys(monthly_category_dict);
	const data = Object.values(monthly_category_dict);

	const month_data = {
		labels: labels,
		datasets: [{
			label: 'My First Dataset',
			data: data,
			backgroundColor: color_list,
			hoverOffset: 4,
			radius : 200
		}]
	};

	const month_config = {
		type: 'doughnut',
		data: month_data,
	};

	const month_Chart = new Chart(month_chart, month_config);

}

//카테고리 설정
function setCategoryTotal(monthly_category_dict, color_list) {

	$(".category_list .category_price").each(function (i, item) {

		let totals = Object.values(monthly_category_dict);
		$(item).text(parseInt(totals[i]) + "원");
	})

	$(".management .ico").each(function (i, item) {
		$(item).css('color',color_list[i]);
	})

}

//외부 json 파일을 가져옴
function homeGenerate() {

	// `data`에 json 값들이 array형태로 저장
	$.getJSON("https://syoon0624.github.io/json/test.json", function (data) {

		const obj_list = jsonProcess(data);

		//역순으로 변환
		const re_obj_list = obj_list.reverse();
		const re_date_group_obj = date_group(re_obj_list);

		//홈화면
		homeScreenGenerate(re_date_group_obj);
	})

}


//홈 화면
homeGenerate()

//지출관리
expenseGenerate();
