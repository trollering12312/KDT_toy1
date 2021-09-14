//메인화면 : 리스트 추가
jsonToHtml();

//외부 json 파일을 가져옴
function jsonToHtml() {
	// `data`에 json 값들이 array형태로 저장
	$.getJSON("https://syoon0624.github.io/json/test.json", function (data) {
		const obj_list = [];
		// json 처리
		data["bankList"].forEach(function (item) {
			//obj -> string
			let json = JSON.stringify(item);
			//string화된 obj를 기반으로 객체 생성
			let parsed_obj = JSON.parse(json);
			obj_list.push(parsed_obj);
		});

        const re_obj_list = obj_list.reverse();

		const date_group_obj = date_group(re_obj_list);

		//console.log(date_group_obj);

		htmlMaker(date_group_obj);
	});
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

function htmlMaker(date_group_obj) {
	let card_num = 0;

	//초기화
	let date = "";
    /*let today_obj = Date.now();*/
    let today_obj = new Date("2021-10-03");

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

		Object.keys(date_group_obj[date_obj]).forEach((obj) => {
			//date 설정
			date = date_group_obj[date_obj][obj].date;

            let date_ob = new Date(date);
            
            const dayToMS = 86400000;

            let diff = parseInt(((today_obj-date_ob)/dayToMS));

            if(diff == 0){
                date = "오늘";
            }
            else if(diff>=1 && diff<=3){
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
				text:
					inout == "in"
						? "+ " + date_group_obj[date_obj][obj].price
						: date_group_obj[date_obj][obj].price
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
