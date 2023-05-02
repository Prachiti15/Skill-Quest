// All javascript code in this project for now is just for demo DON'T RELY ON IT

const random = (max = 100) => {
  return Math.round(Math.random() * max)
}
var barChart;
var doughnutChart;

const randomData = () => {
  return [
    random(),
    random(),
    random(),
    random(),
    random(),
  ]
}


const months = ['Simple Awareness', 'Logical Reasoning', 'Problem Solving', 'Observation', 'Accuracy',]

const cssColors = (color) => {
  return getComputedStyle(document.documentElement).getPropertyValue(color)
}

const getColor = () => {
  return window.localStorage.getItem('color') ?? 'cyan'
}

const colors = {
  primary: cssColors(`--color-${getColor()}`),
  primaryLight: cssColors(`--color-${getColor()}-light`),
  primaryLighter: cssColors(`--color-${getColor()}-lighter`),
  primaryDark: cssColors(`--color-${getColor()}-dark`),
  primaryDarker: cssColors(`--color-${getColor()}-darker`),
}

bar()

async function bar() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("email", window.localStorage.getItem("email"));
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/user/profile", requestOptions)
    .then(resp => resp.json())
    .then(result => {
      barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              data: result.score,
              backgroundColor: colors.primary,
              hoverBackgroundColor: colors.primaryDark,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                gridLines: false,
                ticks: {
                  beginAtZero: true,
                  stepSize: 20,
                  fontSize: 12,
                  fontColor: '#97a4af',
                  fontFamily: 'Open Sans, sans-serif',
                  padding: 10,
                },
              },
            ],
            xAxes: [
              {
                gridLines: false,
                ticks: {
                  fontSize: 12,
                  fontColor: '#97a4af',
                  fontFamily: 'Open Sans, sans-serif',
                  padding: 5,
                },
                categoryPercentage: 0.5,
                maxBarThickness: '30',
              },
            ],
          },
          cornerRadius: 2,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
        },
      })
      doughnutChart = new Chart(document.getElementById('doughnutChart'), {
        type: 'doughnut',
        data: {
          labels: ['Game 1','Game 2', 'Game 3','Game 4', 'Game 5'],
          datasets: [
            {
              data: result.time,
              backgroundColor: [colors.primary,colors.primaryDark, colors.primaryLighter,colors.primaryDarker, colors.primaryLight,],
              hoverBackgroundColor: colors.primaryDark,
              borderWidth: 0,
              weight: 0.5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'bottom',
          },

          title: {
            display: false,
          },
          animation: {
            animateScale: true,
            animateRotate: true,
          },
        },
      })
    })
}

const activeUsersChart = new Chart(document.getElementById('activeUsersChart'), {
  type: 'bar',
  data: {
    labels: [...randomData(), ...randomData()],
    datasets: [
      {
        data: [...randomData(), ...randomData()],
        backgroundColor: colors.primary,
        borderWidth: 0,
        categoryPercentage: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          display: false,
          gridLines: false,
        },
      ],
      xAxes: [
        {
          display: false,
          gridLines: false,
        },
      ],
      ticks: {
        padding: 10,
      },
    },
    cornerRadius: 2,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      prefix: 'Users',
      bodySpacing: 4,
      footerSpacing: 4,
      hasIndicator: true,
      mode: 'index',
      intersect: true,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  },
})

const lineChart = new Chart(document.getElementById('lineChart'), {
  type: 'line',
  data: {
    labels: months,
    datasets: [
      {
        data: randomData(),
        fill: false,
        borderColor: colors.primary,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: false,
          ticks: {
            beginAtZero: false,
            stepSize: 50,
            fontSize: 12,
            fontColor: '#97a4af',
            fontFamily: 'Open Sans, sans-serif',
            padding: 20,
          },
        },
      ],
      xAxes: [
        {
          gridLines: false,
        },
      ],
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      hasIndicator: true,
      intersect: false,
    },
  },
})

let randomUserCount = 0

const usersCount = document.getElementById('usersCount')

const fakeUsersCount = () => {
  randomUserCount = random()
  activeUsersChart.data.datasets[0].data.push(randomUserCount)
  activeUsersChart.data.datasets[0].data.splice(0, 1)
  activeUsersChart.update()
  usersCount.innerText = randomUserCount
}

setInterval(() => {
  fakeUsersCount()
}, 1000)
