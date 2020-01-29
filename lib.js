function getWidthandHeight(obj, m) {
	let width = +obj.attr('width') - m.left - m.right
	let height = +obj.attr('height') - m.top - m.bottom
	return { width, height }
}

function appendToParent(parent, type, className, transformation) {
	return parent.append(type).attrs({
		class: className,
		transform: transformation
	})
}
