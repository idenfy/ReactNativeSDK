//
//  CountryCell.swift
//  testing
//
//  Created by Viktas Juškys on 2022-08-25.
//  Copyright © 2022 iDenfy. All rights reserved.
//

import Foundation
import idenfycore
import iDenfySDK
import idenfyviews
import Lottie

@objc open class CountryCell: UITableViewCell, CountryCellViewable {
    public var hasBorder = false

    public let cellView: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    public var countryLabel: UILabel = {
        let label = UILabel(frame: .zero)
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        label.font = IdenfyCountrySelectionViewUISettingsV2.idenfyCountrySelectionViewCountryTableViewCellFont
        label.textAlignment = .left
        label.textColor = IdenfyCountrySelectionViewUISettingsV2.idenfyCountrySelectionViewCountryTableViewCellTextColor
        return label
    }()

    public var loadingSpinner: LottieAnimationView = {
        let lottieView = LottieAnimationView(frame: .zero)
        lottieView.translatesAutoresizingMaskIntoConstraints = false
        if let anim = Bundle(identifier: "com.idenfy.idenfyviews")!.path(forResource: "idenfy_custom_country_loader", ofType: "json") {
            lottieView.animation = LottieAnimation.filepath(anim)
        }
        lottieView.contentMode = .scaleAspectFit
        lottieView.play()
        lottieView.loopMode = .loop
        lottieView.backgroundBehavior = .pauseAndRestore
        lottieView.isHidden = true
        return lottieView
    }()

    public var countryImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.translatesAutoresizingMaskIntoConstraints = false
        imageView.isOpaque = true
        imageView.layer.cornerRadius = 18
        imageView.layer.masksToBounds = true
        return imageView
    }()

    override public init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupView()
    }

    public required init?(coder _: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func setupView() {
        addSubview(cellView)
        cellView.centerYAnchor.constraint(equalTo: centerYAnchor).isActive = true
        cellView.rightAnchor.constraint(equalTo: safeRightAnchor).isActive = true
        cellView.leftAnchor.constraint(equalTo: safeLeftAnchor).isActive = true
        
        
        cellView.addSubview(countryImageView)
        countryImageView.rightAnchor.constraint(equalTo: cellView.safeRightAnchor, constant: -16).isActive = true
        countryImageView.centerYAnchor.constraint(equalTo: cellView.centerYAnchor).isActive = true
        countryImageView.widthAnchor.constraint(equalToConstant: 36).isActive = true
        countryImageView.heightAnchor.constraint(equalToConstant: 36).isActive = true

        cellView.addSubview(loadingSpinner)
        loadingSpinner.topAnchor.constraint(equalTo: cellView.safeTopAnchor).isActive = true
        loadingSpinner.bottomAnchor.constraint(equalTo: cellView.safeBottomAnchor).isActive = true
        loadingSpinner.rightAnchor.constraint(equalTo: countryImageView.leftAnchor, constant: -8).isActive = true
        loadingSpinner.widthAnchor.constraint(equalToConstant: 25).isActive = true
        loadingSpinner.heightAnchor.constraint(equalToConstant: 25).isActive = true

        cellView.addSubview(countryLabel)
        countryLabel.leftAnchor.constraint(equalTo: cellView.safeLeftAnchor, constant: 16).isActive = true
        countryLabel.rightAnchor.constraint(equalTo: cellView.safeRightAnchor, constant: -(frame.width * 0.3)).isActive = true
        countryLabel.topAnchor.constraint(equalTo: cellView.safeTopAnchor).isActive = true
        countryLabel.bottomAnchor.constraint(equalTo: cellView.safeBottomAnchor).isActive = true
        countryLabel.centerYAnchor.constraint(equalTo: cellView.centerYAnchor).isActive = true
    }
}
