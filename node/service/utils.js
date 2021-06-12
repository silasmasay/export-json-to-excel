const transformValuesIntoArray = (data) => data.map((body) => Object.values(body));

const newData = (json) => {
	const dateOptionsLocaleString = { 
		year: 'numeric', 
		month: '2-digit', 
		day: '2-digit' 
	};

	const valueOptionsLocaleString = { 
		minimumFractionDigits: 2, 
		style: 'currency', 
		currency: 'BRL' 
	}

	const header = {
		SituacaoCadastral: "Situação Cadastral",
		Carteira: "Carteira",
		Porte: "Porte",
		CNPJ: "CNPJ",
		RazaoSocial: "Razão Social",
		Fantasia: "Fantasia",
		Filial: "Filial",
		DataAbertura: "Data Abertura",
		Capital: "Capital",
		Logradouro: "Logradouro",
		Numero: "Número",
		Complemento: "Complemento",
		Bairro: "Bairro",
		Cidades: "Cidade",
		Estado: "Estado",
		CEP: "CEP",
		Email: "Email",
		Telefone: "Telefone",
		DataSituacaoCadastral: "Data - Situação Cadastral",
		Total: "Total",
		CodNaturezaJuridica: "Código - Natureza Jurídica",
		NaturezaJuridica: "Natureza Jurídica",
		CodCNAE: "Código - CNAE",
		CNAE: "CNAE",
		Latitude: "Latitude",
		Longitude: "Longitude",
		Contato: "Contato",
		BigData: "Big Data"
	};

	const body = json.map((data) => ({
		SituacaoCadastral: data.SituacaoCadastral,
		Carteira: data.Carteira,
		Porte: data.Porte,
		CNPJ: data.CNPJ,
		RazaoSocial: data.RazaoSocial,
		Fantasia: data.Fantasia,
		Filial: data.Filial,
		DataAbertura: new Date(data.DataAbertura).toLocaleDateString('pt-BR', dateOptionsLocaleString),
		Capital: Number(data.Capital).toLocaleString('pt-BR', valueOptionsLocaleString),
		Logradouro: data.Logradouro,
		Numero: data.Numero,
		Complemento: data.Complemento,
		Bairro: data.Bairro,
		Cidades: data.Cidades,
		Estado: data.Estado,
		CEP: data.CEP,
		Email: data.Email,
		Telefone: data.Telefone,
		DataSituacaoCadastral: new Date(data.DataSituacaoCadastral).toLocaleDateString('pt-BR', dateOptionsLocaleString),
		Total: data.Total,
		CodNaturezaJuridica: data.CodNaturezaJuridica,
		NaturezaJuridica: data.NaturezaJuridica,
		CodCNAE: data.CodCNAE,
		CNAE: data.CNAE,
		Latitude: data.Latitude,
		Longitude: data.Longitude,
		Contato: data.Contato,
		BigData: data.BigData,
	}));

	return { header, body };
}

module.exports = { transformValuesIntoArray, newData };