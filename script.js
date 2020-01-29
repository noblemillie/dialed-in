// Dimensions
let areaMargin = { left: 50, right: 50, top: 50, bottom: 50 }

let areaWidth =
	(window.innerWidth - areaMargin.left - areaMargin.right - 0) / 1.01
let areaHeight = window.innerHeight - areaMargin.top - areaMargin.bottom

// Data
let areaData = []
let barData = []
const calendarDate = d3.timeDay.range(
	new Date(2019, 0, 1),
	new Date(2019, 11, 31)
)

// Scales
const areaXScale = d3
	.scaleTime()
	.domain(d3.extent(calendarDate))
	.range([0, Math.PI * 2]) // range is the diameter of the circle

const areaYScale = d3.scaleRadial().domain([-800, 1500])

// Generators
const areaGenerator = d3
	.areaRadial()
	.angle(d => areaXScale(d.date))
	.innerRadius(d => areaYScale(d.v0))
	// .innerRadius(areaYScale(1000))
	.outerRadius(d => areaYScale(d.v1))
	.curve(d3.curveBasis)

// Elements
const areaSvg = d3
	.select('body')
	.select('#radial-area')
	.append('svg')
// .attr('id', '#radial-area');
const areaG = areaSvg.append('g')

const areaXAxis = areaG.append('g').attr('class', 'area-axis')

const areaXAxisTicks = areaXAxis
	.selectAll('.area-tick')
	.data(d3.timeMonth.every(1).range(...d3.extent(calendarDate)))
	.enter()
	.append('g')
	.attr('class', 'area-tick')

areaXAxisTicks
	.append('text')
	.attr('dx', 90)
	.attr('dy', -3)
	.attr('transform', 'rotate(15)')
	.text(d => `${d3.timeFormat('%b')(d)}.`)

areaXAxisTicks.append('line').attr('y2', 10)

const areaYAxis = areaG.append('g').attr('class', 'area-axis')

const areaYAxisTicks = areaYAxis
	.selectAll('.tick')
	.data(areaYScale.ticks(5).slice(1))
	.enter()
	.append('g')
	.attr('class', 'area-tick')
	.style('opacity', 0.3)

const areaYAxisCircles = areaYAxisTicks.append('circle')

const areaYAxisTextTop = areaYAxisTicks
	.append('text')
	.attr('dy', 5)
	.text(d => d)

const areaYAxisTextBottom = areaYAxisTicks
	.append('text')
	.attr('dy', 13)
	.text(d => d)

const label = areaSvg
	.append('text')
	.attrs({
		// y: 15,
		// x: 50,
		y: areaHeight - 15,
		x: areaWidth / 1.05,
		stroke: 'lavender',
		'stroke-width': '0.9px',
		'font-size': '4em',
		fill: 'violet',
		'text-anchor': 'end',
		// 'areaMargin-top': '40vh',
		opacity: 0.9
	})
	.text('label')
// .text(currMonth());

// Updater
const duration = 2750

// const obj = { date: Mon Dec 23 2019 00: 00: 00 GMT - 0800(Pacific Standard Time), v1: 43.09999999999995, v0: 6 }

makeData()
redraw()
onresize = _ => redraw(true)
//   d3.interval(_ => {
//     makeData();
//     redraw();
//   }, duration * 12);

function redraw(resizing) {
	// const diameter = Math.min(innerWidth, innerHeight);
	const diameter = Math.min(areaWidth, areaHeight)
	width = diameter - areaMargin.left - areaMargin.right
	height = diameter - areaMargin.top - areaMargin.bottom

	areaYScale.range([0, height / 2])

	areaSvg
		.attr('width', width + areaMargin.left + areaMargin.right)
		.attr('height', height + areaMargin.top + areaMargin.bottom)

	areaG.attr(
		'transform',
		`translate(${areaMargin.left + width / 2}, ${areaMargin.top + height / 2})`
	)

	areaXAxisTicks.attr('transform', (d, i, e) => {
		const point = [width / 2, 0]
		const angle = (i / e.length) * 360
		const rotated = geometric.pointRotate(point, 270 + angle)
		return `translate(${rotated}) rotate(${angle})`
	})

	areaYAxisCircles.attr('r', d => areaYScale(d))

	areaYAxisTextTop.attr('y', d => areaYScale(d))

	areaYAxisTextBottom.attr('y', d => -areaYScale(d))

	// General update pattern for the area, whose data changes
	const area = areaG.selectAll('.area').data([areaData])

	if (resizing) {
		area.attr('d', areaGenerator)
	} else {
		area
			.transition()
			.duration(duration)
			.attr('d', areaGenerator)
	}

	area
		.enter()
		.append('path')
		.attr('class', 'area')
		.attr('d', areaGenerator)
		.style('opacity', 0)
		.transition()
		.duration(duration)
		.style('opacity', 1)
}

function currMonth() {
	var month
	switch (new Date().getMonth()) {
		case 0:
			month = 'January'
			break
		case 1:
			month = 'February'
			break
		case 2:
			month = 'March'
			break
		case 3:
			month = 'April'
			break
		case 10:
			month = 'November'
			break
		case 11:
			month = 'December'
			break
		default:
			month = 'Off Season'
	}
	return month
}
// Functions for generating random data
function makeData() {
	let v0 = randBetween(0, 5)
	v1 = randBetween(10, 30)

	// let v0 = 100
	// let v1 = 100
	let accSnow = 0

	areaData = calendarDate.map((date, i) => {
		// v1 = Math.min(v1 + random([-1.7, 2]), 0)
		// let newSnow = 0
		if (i === 330) {
			accSnow = 0
		}
		if (i > 330) {
			let newSnow = Math.random() * 10
			accSnow = accSnow + newSnow
			v1 = accSnow + newSnow
		}
		if (i === 0) {
			let newSnow = Math.random() * 100
			accSnow = 140
			v1 = accSnow + newSnow
		}
		if (i < 70 && i != 0) {
			let newSnow = Math.random() * 5
			accSnow = accSnow + newSnow
			// v1 = accSnow + newSnow
			v1 = i * (Math.random() * 20)
			// v1 = v1 + Math.random() * 25
		}
		if (i > 70 && i < 100) {
			let newSnow = Math.random() * 19
			accSnow = accSnow - newSnow
			v1 = accSnow
			// v1 = i * (Math.random() * 20)
			// v1 = v1 + Math.random() * 25
		}
		if (i >= 100 && i < 330) {
			v1 = 0
		}

		// v1 = 500
		// v0 = 50
		// v0 = Math.min(Math.max(v0 + random([-1, 1]), 1), v1 - 5)
		// const obj = {
		// 	date,
		// 	v1,
		// 	v0
		// };
		const obj = {
			// date :  Fri Dec 27 2019 00:00:00 GMT-0800,
			date,
			v1,
			v0
		}

		return obj
	})
	// console.log(
	// 	`areaData*********: `,
	// 	// areaData.map(d => console.log(`v1: `, d.v1))
	// 	areaData.filter(d => d.v1)
	// )
}

function randBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function random(arr) {
	return arr[randBetween(0, arr.length - 1)]
}
