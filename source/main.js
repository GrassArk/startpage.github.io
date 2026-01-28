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

document.addEventListener('DOMContentLoaded', () => {
    // 缓存 DOM 元素
    const searchSelectorUl = document.querySelector('.search-engine-selector ul');
    const searchForm = document.querySelector('.search-container form');
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.querySelector('.search-clear-btn');

    // 搜索引擎选择下拉菜单 hover 效果
    if (searchSelectorUl) {
        searchSelectorUl.addEventListener('mouseenter', function() {
            this.style.height = 'auto';
        });
        searchSelectorUl.addEventListener('mouseleave', function() {
            this.style.height = '46px';
        });

        // 搜索引擎切换功能
        // 使用事件委托，监听 ul 上的点击事件
        searchSelectorUl.addEventListener('click', function(e) {
            // 查找最近的 li 祖先元素 (处理点击可能发生在 li 内部的情况)
            const targetLi = e.target.closest('li');
            
            if (!targetLi) return;

            // 如果点击的是当前选中的搜索引擎，不做任何操作
            if (targetLi.classList.contains('selected')) {
                return;
            }

            // 提取引擎标识符
            // 遍历 classList 找到以 'engine-' 开头的类名
            let engineClass = null;
            targetLi.classList.forEach(cls => {
                if (cls.startsWith('engine-')) {
                    engineClass = cls;
                }
            });

            if (!engineClass) return;

            // 获取搜索引擎配置，如果未配置则使用默认引擎
            const config = SEARCH_ENGINES[engineClass] || SEARCH_ENGINES[DEFAULT_ENGINE];

            if (!config) {
                console.error('搜索引擎配置无效:', engineClass);
                return;
            }

            // 更新表单的 action 属性
            if (searchForm) {
                searchForm.setAttribute('action', config.url);
            }

            // 移除所有搜索引擎项的 selected 类
            const allLis = searchSelectorUl.querySelectorAll('li');
            allLis.forEach(li => li.classList.remove('selected'));

            // 将当前选中的 li 元素设为 selected 并移到列表第一位
            targetLi.classList.add('selected');
            searchSelectorUl.prepend(targetLi);

            // 更新搜索输入框的 name 属性
            if (searchInput) {
                searchInput.setAttribute('name', config.paramName);
            }

            // 收起下拉菜单
            searchSelectorUl.style.height = '46px';
        });
    }

    // ==================== 清空按钮功能 ====================

    // 清空按钮点击事件
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            clearSearchInput();
            this.style.display = 'none';
        });
    }
});

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
