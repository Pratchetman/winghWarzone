const traductor = (e) => {
  switch (e) {
    case "SMG":
      return "Subfusil";

    case "AR":
      return "Rifle de asalto";

    case "BR":
      return "Ametralladora ligera";

    case "Pistola":
      return "Pistola";

    case "SR":
      return "Francotirador";

    case "LMG":
      return "Ametralladora pesada";

    case "TR":
      return "Fusil táctico";

    case "SG":
      return "Escopeta";

    default:
      return "Error en el tipo";
  }
};


export default traductor;
