const fetch = require('node-fetch');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllDates = catchAsync(async (req, res, next) => {
  const { sexo, ageMin, ageMax } = req.query;

  parseInt(ageMin);
  parseInt(ageMax);

  const response = await fetch(
    'https://www.datos.gov.co/resource/gt2j-8ykr.json'
  );

  const data = await response.json();

  const newData = [];

  data.map(iteracion =>
    newData.push({
      id: iteracion.id_de_caso,
      sexo: iteracion.sexo,
      edad: iteracion.edad,
      ciudad: iteracion.ciudad_municipio_nom,
      estado: iteracion.estado,
    })
  );

  if (ageMin > ageMax) {
    return next(
      new AppError('la edad minima no puede ser mayor q edad maxima', 404)
    );
  }

  const filterData = newData.filter(item => {
    if (sexo && ageMin && ageMax) {
      return sexo === item.sexo && item.edad >= ageMin && item.edad <= ageMax;
    }
    if (sexo && ageMin) {
      return sexo === item.sexo && item.edad >= ageMin;
    }
    if (sexo && ageMax) {
      return sexo === item.sexo && item.edad <= ageMax;
    }

    if (ageMin && ageMax) {
      return item.edad >= ageMin && item.edad <= ageMax;
    }

    if (ageMin) {
      return item.edad >= ageMin;
    }

    if (ageMax) {
      return item.edad <= ageMax;
    }

    if (sexo) {
      return sexo === item.sexo;
    }

    return newData;
  });

  res.status(200).json({
    status: 'success',
    data: { filterData },
  });
});
