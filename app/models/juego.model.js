
module.exports = (sequelize, Sequelize) => {
	const Juego = sequelize.define('juego', {	
	  id_juego: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  nombre_juego: {
			type: Sequelize.STRING
	  },
	  genero: {
			type: Sequelize.STRING
  	},
	  plataforma: {
			type: Sequelize.STRING
	  },
	  fecha_lazamiento: {
			type: Sequelize.DATE
    },
	  precio_alquiler: {
			type: Sequelize.DOUBLE
	  },
	  disponibilidad: {
			type: Sequelize.INTEGER
	  },
	  fecha_alquiler: {
			type: Sequelize.DATEONLY
	  },
      fecha_devolucion: {
			type: Sequelize.DATEONLY
    },
	  Nombre_cliente: {
		type: Sequelize.STRING
	},
	  Comentarios: {
		type: Sequelize.STRING
	},
	});
	
	return Juego;
}
