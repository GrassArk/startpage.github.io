/**
 * StartPage 导航页主要功能
 */

// 搜索引擎选择下拉菜单效果
$('.Select-box-2 ul').hover(
	function() {
		$(this).css('height', 'auto');
	},
	function() {
		$(this).css('height', '46px');
	}
);

// 搜索引擎切换
$('.Select-box-2 li').click(function() {
	var searchClass = $(this).attr('class');
	var searchText = $(this).html();
	var paramName = 'q';

	// 如果点击的是当前选中的搜索引擎，不做任何操作
	if (searchClass === 'this_s') {
		return "";
	}

	// 根据选中的类名设置对应的搜索引擎
	if (searchClass === 'baidu_s') {
		searchUrl = 'https://www.bing.com/search';
		paramName = 'q';
	} else if (searchClass === 'magi_s') {
		searchUrl = 'https://pubmed.ncbi.nlm.nih.gov/';
		paramName = 'term';
	} else if (searchClass === 'google_s') {
		searchUrl = 'https://www.google.com/search';
		paramName = 'q';
	} else {
		searchUrl = 'https://www.bing.com/search';
		paramName = 'q';
	}

	// 更新表单 action 和输入框 name
	$('.baidu form').attr('action', searchUrl);
	$('.this_s').html(searchText);
	$('#kw-2').attr('name', paramName);
	$('.Select-box-2 ul').css('height', '46px');
});

// 清空搜索框内容
$('.qingkong').click(function() {
	clearSearchInput();
	$(this).css('display', 'none');
});

/**
 * 清空所有文本输入框的内容
 */
function clearSearchInput() {
	var inputs = document.getElementsByTagName("INPUT");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type === 'text') {
			inputs[i].value = "";
		}
	}
}

/**
 * 监听搜索框，自动显示/隐藏清空按钮
 */
function initClearButton() {
	var searchInput = document.getElementById("kw") || document.getElementById("kw-2");
	var clearBtn = document.getElementById("qingkong");

	// 如果搜索框不存在，不执行后续操作
	if (!searchInput || !clearBtn) {
		return false;
	}

	// 搜索框获得焦点时，监听内容变化
	searchInput.onfocus = function() {
		var timer = setInterval(function() {
			if (searchInput.value !== "") {
				clearBtn.style.display = "block";
			} else {
				clearBtn.style.display = "none";
			}
		}, 200);

		// 失去焦点时清除定时器
		searchInput.onblur = function() {
			clearInterval(timer);
		};
	};
}

// 初始化清空按钮功能
initClearButton();
