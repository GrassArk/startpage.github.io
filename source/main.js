/**
 * StartPage 导航页主要功能
 */

// ==================== 搜索引擎功能 ====================

/**
 * 搜索引擎配置
 * 每个引擎包含：搜索 URL 和查询参数名称
 */
const SEARCH_ENGINES = {
	'engine-google': {
		url: 'https://www.google.com/search',
		paramName: 'q'
	},
	'engine-bing': {
		url: 'https://www.bing.com/search',
		paramName: 'q'
	},
	'engine-pubmed': {
		url: 'https://pubmed.ncbi.nlm.nih.gov/',
		paramName: 'term'
	}
};

// 默认搜索引擎配置（Google）
const DEFAULT_ENGINE = 'engine-google';

// 搜索引擎选择下拉菜单 hover 效果
$('.search-engine-selector ul').hover(
	function() {
		$(this).css('height', 'auto');
	},
	function() {
		$(this).css('height', '46px');
	}
);

/**
 * 搜索引擎切换功能
 * 当用户点击下拉菜单中的搜索引擎时触发
 */
$('.search-engine-selector li').click(function() {
	const clickedClass = $(this).attr('class');
	const engineName = $(this).html();

	// 如果点击的是当前选中的搜索引擎，不做任何操作
	if (clickedClass.includes('selected')) {
		return;
	}

	// 提取引擎标识符（移除 'selected' 类名）
	const engineClass = clickedClass.replace('selected', '').trim();

	// 获取搜索引擎配置，如果未配置则使用默认引擎
	const config = SEARCH_ENGINES[engineClass] || SEARCH_ENGINES[DEFAULT_ENGINE];

	// 验证配置有效性
	if (!config) {
		console.error('搜索引擎配置无效:', engineClass);
		return;
	}

	// 更新表单的 action 属性
	$('.search-container form').attr('action', config.url);

	// 移除所有搜索引擎项的 selected 类，并添加到当前点击项
	$('.search-engine-selector li').removeClass('selected');
	$(this).addClass('selected');

	// 更新显示的搜索引擎名称
	$('.search-engine-selector .selected').html(engineName);

	// 更新搜索输入框的 name 属性（不同搜索引擎使用不同的参数名）
	$('#search-input').attr('name', config.paramName);

	// 收起下拉菜单
	$('.search-engine-selector ul').css('height', '46px');
});

// ==================== 清空按钮功能 ====================

/**
 * 清空所有文本输入框的内容
 */
function clearSearchInput() {
	const inputs = document.getElementsByTagName("INPUT");
	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i].type === 'text') {
			inputs[i].value = "";
		}
	}
}

// 清空按钮点击事件
$('.search-clear-btn').click(function() {
	clearSearchInput();
	$(this).css('display', 'none');
});

/**
 * 初始化清空按钮功能
 * 监听搜索框内容变化，自动显示/隐藏清空按钮
 */
function initClearButton() {
	const searchInput = document.getElementById("search-input");
	const clearBtn = document.getElementById("search-clear-btn");

	// 如果搜索框或清空按钮不存在，不执行后续操作
	if (!searchInput || !clearBtn) {
		return false;
	}

	// 搜索框获得焦点时，监听内容变化
	searchInput.onfocus = function() {
		const timer = setInterval(function() {
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
