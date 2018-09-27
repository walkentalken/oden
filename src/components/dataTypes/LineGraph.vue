<template>
	<div class="single-chart" :class="[activeClass, currentMetric]">
		<div class="canvas"></div>
	</div>
</template>

<script>
import * as d3 from 'd3'
import GetMetrics from '@/services/api/GetMetrics'
import { mapGetters } from 'vuex'

export default {
	data () {
		return{
			metrics: [],
			width: 500,
			height: 500,
			path: '',
			selected: null,
			currentMetric: this.parameter
		}
	},
	props: {
		title: String,
		parameter: String
	},
	computed: {
		activeClass: function () {
			return {
				active: this.currentActiveChart == this.title
			}
		},
		...mapGetters([
			'currentActiveChart'
		])
	},
	created () {
		GetMetrics.getData(this.parameter)
			.then(posts => {
				this.metrics = posts.series
				this.buildGraph(this.metrics)
			})
	},
	methods: {
		buildGraph: function (metricData) {
		let data = metricData

		const parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")

		function type(dataArray) {
			dataArray.forEach(function(d) {
				d.year = parseDate(d[0])
				let widthArray = d[1]
				d.min = widthArray.slice(0, 1).shift()
				d.avg = widthArray.slice(1, 2).shift()
				d.max = widthArray.slice(2, 3).shift()
			})
			return dataArray
		}

		data = type(data)

		// Set the dimensions of the canvas / graph
		const margin = {top: 30, right: 20, bottom: 30, left: 50},
			width = 1000 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom


		// Set the scales ranges
		const x = d3.scaleTime().range([0, width])
		const y = d3.scaleLinear().range([height, 0])

		// Define the axes
		const xAxis = d3.axisBottom().scale(x)
		const yAxis = d3.axisLeft().scale(y)

		// create a line based on the data
		const lineMin = d3.line()
			.x(function(d) { return x(d.year) })
			.y(function(d) { return y(d.min) })

		const lineAvg = d3.line()
			.x(function(d) { return x(d.year) })
			.y(function(d) { return y(d.avg) })

		const lineMax = d3.line()
			.x(function(d) { return x(d.year) })
			.y(function(d) { return y(d.max) })

		// Add the svg canvas
		const svg = d3.select("." + this.parameter + " .canvas")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

		// set the domain range from the data
		x.domain(d3.extent(data, function(d) { return d.year }))
		y.domain(d3.extent(data, function(d) { return d.min }))

		// draw the line created above
		svg.append("path").data([data])
			.style('fill', 'none')
			.style('stroke', '#b73007')
			.style('stroke-width', '1px')
			.attr("d", lineMin)

		svg.append("path").data([data])
			.style('fill', 'none')
			.style('stroke', '#1bb507')
			.style('stroke-width', '1px')
			.attr("d", lineAvg)

		svg.append("path").data([data])
			.style('fill', 'none')
			.style('stroke', '#07b2b5')
			.style('stroke-width', '1px')
			.attr("d", lineMax)

		// Add the X Axis
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)

		// Add the Y Axis
		svg.append("g")
			.call(yAxis)
		}
	}
}
</script>

<style scoped>
li{
list-style: none;
}
.single-chart{
display: none;
}
.active{
display: block;
}
</style>
