-- Copiando estrutura para tabela db.pessoas
CREATE TABLE IF NOT EXISTS `pessoas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db.pessoas: ~2 rows (aproximadamente)
INSERT IGNORE INTO `pessoas` (`id`, `nome`) VALUES
	(1, 'Matheus'),
	(2, 'Fulano');