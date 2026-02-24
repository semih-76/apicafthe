-- On nettoie la table pour éviter les erreurs d'ID
TRUNCATE TABLE articles;

-- On insère les 15 produits
INSERT INTO articles (nom_produit, description, categorie, type_vente, prix_ht, taux_tva, prix_ttc, stock, images, origine) VALUES
-- 5 CAFÉS (TVA 5.5%)
('Arabica Éthiopie', 'Café grains, notes florales, 250g', 'Café', 'Unité', 7.50, 0.055, 7.91, 100, 'paquet-marron.webp', 'Éthiopie'),
('Robusta Pur', 'Café moulu corsé, idéal expresso, 500g', 'Café', 'Unité', 12.00, 0.055, 12.66, 50, 'paquet-blanc.webp', 'Vietnam'),
('Moka Harrar', 'Café sauvage, notes fruits rouges, 250g', 'Café', 'Unité', 8.50, 0.055, 8.97, 80, 'paquet-blanc.webp', 'Éthiopie'),
('Blue Mountain', 'Café d`exception, doux et rare, 250g', 'Café', 'Unité', 25.00, 0.055, 26.38, 20, 'paquet-marron.webp', 'Jamaïque'),
('Décaféiné Eau', 'Sans solvant, arôme préservé, 500g', 'Café', 'Unité', 11.00, 0.055, 11.61, 45, 'paquet-blanc.webp', 'Colombie'),
('Colombie Supremo', 'Café grains doux et équilibré, 250g', 'Café', 'Unité', 9.00, 0.055, 9.50, 70, 'paquet-marron.webp', 'Colombie'),
('Kenya AA', 'Café acidulé notes agrumes, 250g', 'Café', 'Unité', 10.50, 0.055, 11.08, 60, 'paquet-blanc.webp', 'Kenya'),
('Brésil Santos', 'Café moulu chocolaté, 500g', 'Café', 'Unité', 8.00, 0.055, 8.44, 90, 'paquet-marron.webp', 'Brésil'),
('Guatemala Antigua', 'Café grains épicé et complexe, 250g', 'Café', 'Unité', 11.50, 0.055, 12.13, 55, 'paquet-blanc.webp', 'Guatemala'),
('Sumatra Mandheling', 'Café corsé terreux, 250g', 'Café', 'Unité', 10.00, 0.055, 10.55, 65, 'paquet-marron.webp', 'Indonésie'),
('Costa Rica Tarrazu', 'Café grains vif et fruité, 250g', 'Café', 'Unité', 9.50, 0.055, 10.02, 75, 'paquet-blanc.webp', 'Costa Rica'),
('Yirgacheffe Bio', 'Café floral et délicat, 250g', 'Café', 'Unité', 12.50, 0.055, 13.19, 40, 'paquet-marron.webp', 'Éthiopie'),
('Espresso Italien', 'Mélange traditionnel torréfié, 500g', 'Café', 'Unité', 10.50, 0.055, 11.08, 85, 'paquet-blanc.webp', 'Italie'),
('Pérou Organique', 'Café bio équitable, 250g', 'Café', 'Unité', 8.50, 0.055, 8.97, 95, 'paquet-marron.webp', 'Pérou'),
('Maragogype', 'Grains géants doux, 250g', 'Café', 'Unité', 13.50, 0.055, 14.24, 30, 'paquet-blanc.webp', 'Mexique'),

-- 5 THÉS (TVA 5.5%)
('Thé Vert Sencha', 'Thé vert bio du Japon, 100g', 'Thé', 'Unité', 9.50, 0.055, 10.02, 30, 'paquet-vert.webp', 'Japon'),
('Assam Breakfast', 'Thé noir corsé, idéal pour le matin', 'Thé', 'Unité', 8.50, 0.055, 8.97, 60, 'paquet-vert.webp', 'Inde'),
('Earl Grey Royal', 'Thé noir à la bergamote, 100g', 'Thé', 'Unité', 10.50, 0.055, 11.08, 40, 'paquet-noir.webp', 'Inde'),
('Rooibos Vanille', 'Sans théine, gourmand, 100g', 'Thé', 'Unité', 9.00, 0.055, 9.50, 55, 'paquet-noir.webp', 'Afrique du Sud'),
('Matcha Cérémonie', 'Poudre premium pour fouet, 30g', 'Thé', 'Unité', 19.50, 0.055, 20.57, 15, 'paquet-vert.webp', 'Japon'),
('Darjeeling Flush', 'Thé noir primeur délicat, 100g', 'Thé', 'Unité', 12.50, 0.055, 13.19, 35, 'paquet-noir.webp', 'Inde'),
('Oolong Formose', 'Thé semi-oxydé floral, 100g', 'Thé', 'Unité', 11.50, 0.055, 12.13, 45, 'paquet-vert.webp', 'Taïwan'),
('Thé Blanc Pai Mu', 'Thé délicat et raffiné, 50g', 'Thé', 'Unité', 15.00, 0.055, 15.83, 25, 'paquet-noir.webp', 'Chine'),
('Pu-Erh 5 ans', 'Thé fermenté digestif, 100g', 'Thé', 'Unité', 14.50, 0.055, 15.30, 20, 'paquet-vert.webp', 'Chine'),
('Jasmin Perles', 'Thé vert parfumé jasmin, 100g', 'Thé', 'Unité', 10.00, 0.055, 10.55, 50, 'paquet-noir.webp', 'Chine'),
('Ceylon Pekoe', 'Thé noir vif et aromatique, 100g', 'Thé', 'Unité', 9.50, 0.055, 10.02, 65, 'paquet-vert.webp', 'Sri Lanka'),
('Gunpowder Bio', 'Thé vert roulé puissant, 100g', 'Thé', 'Unité', 8.00, 0.055, 8.44, 70, 'paquet-noir.webp', 'Chine'),
('Chai Masala', 'Mélange épicé traditionnel, 100g', 'Thé', 'Unité', 9.00, 0.055, 9.50, 55, 'paquet-vert.webp', 'Inde'),
('Gyokuro Imperial', 'Thé vert ombré premium, 50g', 'Thé', 'Unité', 22.00, 0.055, 23.21, 15, 'paquet-noir.webp', 'Japon'),
('Honeybush Citron', 'Infusion sans théine, 100g', 'Thé', 'Unité', 8.50, 0.055, 8.97, 60, 'paquet-vert.webp', 'Afrique du Sud'),

-- 5 ACCESSOIRES (TVA 20%)
('Filtres Papier', 'Boîte de 100 filtres N°4', 'Accessoires', 'Unité', 3.50, 0.20, 4.20, 200, 'filtres.webp', 'Allemagne'),
('Moulin à Café', 'Manuel avec meules céramique', 'Accessoires', 'Unité', 45.00, 0.20, 54.00, 10, 'moulin.webp', 'Chine'),
('Théière Fonte', 'Modèle traditionnel émaillé, 0.8L', 'Accessoires', 'Unité', 42.00, 0.20, 50.40, 8, 'théière.webp', 'Japon'),
('Presse Française', 'Cafetière à piston verre/inox', 'Accessoires', 'Unité', 29.00, 0.20, 34.80, 12, 'presse.webp', 'France'),
('Balance Précision', 'Mesure au 0.1g près pour dosage', 'Accessoires', 'Unité', 18.50, 0.20, 22.20, 25, 'balance.webp', 'Chine');